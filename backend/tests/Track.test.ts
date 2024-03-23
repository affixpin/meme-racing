import { expect, test, afterEach, afterAll } from "vitest";
import pino from "pino";

import { RacesStorage } from "../src/storage/race/RacesStorage";
import { createMongo } from "./createMongo";
import { Races } from "../src/services/Races";
import { getRaceCreateData } from "./data/races";
import { PricesStorage } from "../src/storage/prices/PricesStorage";
import { Track } from "../src/services/Track";
import { client, deployContracts } from "./blockchain";
import { AssetInfoProviderMock, DEFAULT_PRICE } from "./mocks";
import { RaceState } from "../src/entities/Race";

const logger = pino();
const mongo = createMongo();
const contracts = await deployContracts();
const racesStorage = new RacesStorage(logger, mongo);
const pricesStorage = new PricesStorage(mongo);
const assetsInfoProvider = new AssetInfoProviderMock();
const races = new Races(logger, racesStorage, assetsInfoProvider);
const track = new Track(
	logger,
	races,
	pricesStorage,
	client,
	contracts.trackContractAddress
);

test("get just created track race", async () => {
	const race = await racesStorage.create(getRaceCreateData());
	const trackRace = await track.getRaceById(race.id);

	expect(trackRace).toBeDefined();
	expect(trackRace?.winnerAsset).toBeUndefined();
	trackRace?.assets.forEach((asset) => {
		expect(asset.price).toEqual(DEFAULT_PRICE);
		expect(asset.endPrice).toBeUndefined();
		expect(asset.startPrice).toBeUndefined();
		expect(asset.currentPriceChange).toBeUndefined();
		expect(asset.priceChange).toBeUndefined();
	});
});

test("laps from betting state to racing state", async () => {
	const race = await racesStorage.create(getRaceCreateData());

	let state = await contracts.trackContract.read.getState([BigInt(race.id)]);
	expect(state).toEqual(RaceState.BETTING);

	await track.processBettings();
	const trackRace = await track.getRaceById(race.id);

	expect(trackRace).toBeDefined();
	expect(trackRace?.state).toEqual(RaceState.RACING);
	expect(trackRace?.winnerAsset).toBeUndefined();
	trackRace?.assets.forEach((asset) => {
		expect(asset.price).toEqual(DEFAULT_PRICE);
		expect(asset.startPrice).toEqual(DEFAULT_PRICE);
		expect(asset.priceChange).toBeUndefined();
		expect(asset.currentPriceChange).toEqual(0);
		expect(asset.endPrice).toBeUndefined();
	});
	state = await contracts.trackContract.read.getState([BigInt(race.id)]);
	expect(state).toEqual(RaceState.RACING);
});

test("calculates currentPriceChange correctly", async () => {
	const race = await racesStorage.create(getRaceCreateData());

	await track.processBettings();
	let trackRace = await track.getRaceById(race.id);

	expect(trackRace).toBeDefined();
	expect(trackRace?.winnerAsset).toBeUndefined();
	trackRace?.assets.forEach((asset) => {
		expect(asset.currentPriceChange).toEqual(0);
	});
	const newPrice = DEFAULT_PRICE * 2;
	assetsInfoProvider.setFirstAssetPrice(newPrice);
	trackRace = await track.getRaceById(race.id);
	expect(trackRace?.assets[0].price).toEqual(newPrice);
	expect(trackRace?.assets[1].price).toEqual(DEFAULT_PRICE);
	expect(trackRace?.assets[0].currentPriceChange).toEqual(1);
	expect(trackRace?.assets[1].currentPriceChange).toEqual(0);
});

test("laps from racing state to finished state", async () => {
	const race = await racesStorage.create(getRaceCreateData());
	await track.processBettings();

	const newPrice = DEFAULT_PRICE * 2;
	assetsInfoProvider.setFirstAssetPrice(newPrice);
	await track.processRacings();

	let trackRace = await track.getRaceById(race.id);
	expect(trackRace).toBeDefined();
	expect(trackRace?.state).toEqual(RaceState.FINISHED);

	trackRace?.assets.forEach((asset) => {
		expect(asset.endPrice).toBeDefined();
		expect(asset.priceChange).toBeDefined();
	});

	expect(trackRace).toBeDefined();
	expect(trackRace?.winnerAsset).toBeDefined();
	expect(trackRace?.winnerAsset?.id).toEqual(0);
	let blockchainWinnerAssetId =
		await contracts.trackContract.read.getWinnerAssetId([
			BigInt(trackRace!.id),
		]);
	expect(blockchainWinnerAssetId).toEqual(BigInt(trackRace!.winnerAsset!.id));
});

afterEach(async () => {
	assetsInfoProvider.reset();
	await mongo.cleanup();
});

afterAll(async () => {
	await mongo.close();
});
