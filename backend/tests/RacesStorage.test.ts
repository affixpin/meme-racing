import { expect, test, afterAll } from "vitest";
import pino from "pino";

import { RacesStorage } from "../src/storage/race/RacesStorage";
import { createMongo } from "./createMongo";
import { getRaceCreateData } from "./data/races";

const mongo = createMongo();
const logger = pino();

test("creates race", async () => {
	const racesStorage = new RacesStorage(logger, mongo);
	const race = await racesStorage.create(getRaceCreateData());

	expect(race).toBeDefined();
});

afterAll(async () => {
	await mongo.cleanup();
	await mongo.close();
});
