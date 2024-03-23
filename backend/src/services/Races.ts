import { Logger } from "pino";

import { Race, RaceState } from "../entities/Race";
import { CreateRaceData, RacePersistent } from "../storage/race/RacePersistent";
import { RacesStorage } from "../storage/race/RacesStorage";
import { AssetsInfoProvider } from "../vendors/AssetsInfoProvider";

export class Races {
	constructor(
		private readonly logger: Logger,
		private readonly storage: RacesStorage,
		private readonly assetsInfoProvider: AssetsInfoProvider
	) {
		this.logger = logger.child({}, { msgPrefix: "Races: " });
	}

	private async mapPersistant(racePersistant: RacePersistent): Promise<Race> {
		const assetsInfo = await this.assetsInfoProvider.getInfo(
			racePersistant.assetsInfoProviderIds
		);

		this.logger.debug({ id: racePersistant.id }, "mapping persistant");

		return {
			id: racePersistant.id,
			shortId: racePersistant.shortId,
			start: racePersistant.start,
			end: racePersistant.end,
			state: racePersistant.state,
			assets: assetsInfo.map((coin, index) => ({
				...coin,
				id: index,
			})),
		};
	}

	async updateState(id: string, state: RaceState): Promise<void> {
		await this.storage.updateState(id, state);
	}

	async getById(id: string): Promise<Race | null> {
		const racePersistant = await this.storage.getById(id);
		if (!racePersistant) return null;
		return this.mapPersistant(racePersistant);
	}

	async getByDbId(shortId: string): Promise<Race | null> {
		const racePersistant = await this.storage.getByDbId(shortId);
		if (!racePersistant) return null;
		return this.mapPersistant(racePersistant);
	}

	async create(createData: CreateRaceData): Promise<Race> {
		const racePersistant = await this.storage.create(createData);
		return this.mapPersistant(racePersistant);
	}

	async getByStatus(status: RaceState): Promise<Race[]> {
		const racesPersistant = await this.storage.getByState(status);

		this.logger.debug(
			{ status, length: racesPersistant.length },
			"get by status"
		);

		return Promise.all(
			racesPersistant.map((racePersistant) =>
				this.mapPersistant(racePersistant)
			)
		);
	}
}
