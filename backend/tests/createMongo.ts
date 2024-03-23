import { randomUUID } from "crypto";

import { Mongo } from "../src/mongo";
import { config } from "./config";

export function createMongo() {
	return new Mongo(config.mongoURI, "t-" + randomUUID());
}
