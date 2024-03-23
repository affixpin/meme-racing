import Big from "big.js";
import { Account, Chain, getContract, Transport, WalletClient } from "viem";
import { Logger } from "pino";
import { retryAsync } from "ts-retry";

import { Races } from "./Races";
import { PricesStorage } from "../storage/prices/PricesStorage";
import { Race, RaceState } from "../entities/Race";
import { TrackRace } from "../entities/TrackRace";
import { Asset } from "../entities/Asset";
import { TrackAsset } from "../entities/TrackAsset";
import { TrackResource } from "../resources/TrackResource";

// winner determination logic
export class Track {
	private readonly trackContract;

	constructor(
		private readonly logger: Logger,
		private readonly races: Races,
		private readonly pricesStorage: PricesStorage,
		private readonly client: WalletClient<Transport, Chain, Account>,
		trackContractAddress: `0x${string}`
	) {
		this.logger = logger.child({}, { msgPrefix: "Track: " });
		this.trackContract = getContract({
			address: trackContractAddress,
			abi: TrackResource.abi,
			client,
		});
	}

	async getRaceById(id: string): Promise<TrackRace | null> {
		const race = await this.races.getById(id);
		if (!race) return null;
		return this.mapWithTrackAssets(race);
	}

	async getRaceByDbId(shortId: string): Promise<TrackRace | null> {
		const race = await this.races.getByDbId(shortId);
		if (!race) return null;
		return this.mapWithTrackAssets(race);
	}

	async processBettings() {
		const l = this.logger.child({}, { msgPrefix: "betting state - " });

		const races = await this.races.getByStatus(RaceState.BETTING);
		l.debug({ length: races.length }, "found");

		for (const race of races) {
			// retry to avoid nonce issues
			await retryAsync(() => this.processBetting(race, l), {
				delay: 5000,
				maxTry: 5,
			});
		}
	}

	async processRacings() {
		const l = this.logger.child({}, { msgPrefix: "racing state - " });

		const races = await this.races.getByStatus(RaceState.RACING);
		l.debug({ length: races.length }, "found");

		for (const race of races) {
			await retryAsync(() => this.processRacing(race, l), {
				delay: 5000,
				maxTry: 5,
			});
		}
	}

	private findWinner(assets: TrackAsset[]): TrackAsset | undefined {
		return assets.reduce(
			(max, el) => {
				if (typeof el.priceChange !== "number") return max;
				if (typeof max?.priceChange !== "number") return el;
				return el.priceChange > max.priceChange ? el : max;
			},
			undefined as TrackAsset | undefined
		);
	}

	private async mapWithTrackAssets(race: Race): Promise<TrackRace | null> {
		const trackAssets = await Promise.all(
			race.assets.map((a) => this.toTrackAsset(race.id, a))
		);
		return {
			...race,
			assets: trackAssets,
			winnerAsset: this.findWinner(trackAssets),
		};
	}

	// with prices captured
	private async toTrackAsset(
		raceId: string,
		asset: Asset
	): Promise<TrackAsset> {
		const startPrice = await this.pricesStorage.getStartPrice(raceId, asset.id);
		const endPrice = await this.pricesStorage.getEndPrice(raceId, asset.id);

		let priceChange: undefined | number;
		let currentPriceChange: undefined | number;

		if (startPrice && endPrice?.value) {
			priceChange = new Big(endPrice.value)
				.sub(startPrice.value)
				.div(startPrice.value)
				.toNumber();
		}

		if (startPrice) {
			currentPriceChange = new Big(asset.price)
				.sub(startPrice.value)
				.div(startPrice.value)
				.toNumber();
		}

		return {
			...asset,
			startPrice: startPrice?.value,
			endPrice: endPrice?.value,
			priceChange,
			currentPriceChange,
		};
	}

	private async processBetting(race: Race, logger: Logger = this.logger) {
		const l = logger.child({ id: race.id });

		if (new Date() < race.start) {
			l.debug(`in betting state, not ready to start yet`);
			return;
		}

		l.info("in betting state, ready to start, creating tx");
		for (let i = 0; i < race.assets.length; i++) {
			const a = race.assets[i];
			await this.pricesStorage.addStartPrice(race.id, i, a.price);
			l.info({ price: a.price }, `added start price`);
		}

		await this.trackContract.write.start([BigInt(race.id)], {
			account: this.client.account,
		});

		l.info("started on chain");

		await this.races.updateState(race.id, RaceState.RACING);
		l.info("state updated");
	}

	private async processRacing(race: Race, logger: Logger = this.logger) {
		const l = logger.child({ id: race.id });

		if (Date.now() < race.end.getTime()) {
			l.debug("not ready to finish");
			return;
		}

		l.info("ready to finish");

		await Promise.all(
			race.assets.map((a) =>
				this.pricesStorage.addEndPrice(race.id, a.id, a.price)
			)
		);
		const trackAssets = await Promise.all(
			race.assets.map((a) => this.toTrackAsset(race.id, a))
		);

		const winnerAsset = this.findWinner(trackAssets);
		if (!winnerAsset) {
			l.fatal("no winner found");
			throw new Error("no winner found");
		}

		l.info({ winnerAsset }, `winner found`);

		const raceId = BigInt(race.id);
		const winnerAssetId = BigInt(winnerAsset.id);

		const blockchainState = await this.trackContract.read.getState([raceId]);

		if (blockchainState !== RaceState.FINISHED) {
			await this.trackContract.write.finish([raceId, winnerAssetId]);
			l.info(`blockchain state updated to finished`);
		} else {
			l.info(`blockchain state is finished already`);
		}

		const fee = await this.trackContract.read.getAvailableFee([
			BigInt(race.id),
		]);

		if (fee > 0) {
			l.info({ fee }, `claiming fee`);
			await this.trackContract.write.claimFee([BigInt(race.id)]);
		} else {
			l.info(`no fee to claim`);
		}

		await this.races.updateState(race.id, RaceState.FINISHED);
		l.info(`state updated`);
	}
}
