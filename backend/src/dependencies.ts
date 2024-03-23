import { createWalletClient, fallback, getContract, http } from "viem";
import { base, anvil } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import pino from "pino";
import pinoPretty from "pino-pretty";

import { config } from "./config";
import { Mongo } from "./mongo";
import { FarcasterAddresses } from "./services/FarcasterAddresses";
import { Races } from "./services/Races";
import { Track } from "./services/Track";
import { FarcasterAddressesStorage } from "./storage/farcaster-address/FarcasterAddressesStorage";
import { PricesStorage } from "./storage/prices/PricesStorage";
import { RacesStorage } from "./storage/race/RacesStorage";
import { CMC } from "./vendors/CMC";
import { TrackResource } from "./resources/TrackResource";
import { Laps } from "./services/Laps";
import { Neynar } from "./vendors/Neynar";
import { Pinata } from "./vendors/Pinata";

// logger
export const logger = pino(
	{ level: config.logLevel },
	config.logPretty ? pinoPretty() : undefined
);

// viem
export const account = privateKeyToAccount(config.ownerPrivateKey);
const supportedChains = [base, anvil];
const chain = supportedChains.find(
	(chain) => chain.id === parseInt(config.chainId.split(":")[1])
);
export const client = createWalletClient({
	chain,
	account,
	transport: fallback(config.nodeURLs.map((url) => http(url))),
});
export const trackContract = getContract({
	address: config.trackContractAddress,
	abi: TrackResource.abi,
	client,
});

// services
export const mongo = new Mongo(config.mongoURI, config.mongoDatabase);
export const pricesStorage = new PricesStorage(mongo);
export const racesStorage = new RacesStorage(logger, mongo);
export const farcasterAddressesStorage = new FarcasterAddressesStorage(mongo);
export const cmc = new CMC(config.cmcApiKey, config.cmcCacheDuration);
export const neynar = new Neynar(config.neynarApiKey, config.followTargetId);
export const pinata = new Pinata(
	logger,
	config.pinataJWT,
	config.followTargetId
);
export const races = new Races(logger, racesStorage, cmc);
export const track = new Track(
	logger,
	races,
	pricesStorage,
	client,
	config.trackContractAddress
);
export const farcasterAddresses = new FarcasterAddresses(
	logger,
	farcasterAddressesStorage
);
export const laps = new Laps(logger, config.lapPeriod, track);

export function init() {
	// racesStorage.init();
	laps.init();
}
