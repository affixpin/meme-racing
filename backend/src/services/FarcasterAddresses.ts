import { Logger } from "pino";
import { FarcasterAddress } from "../entities/FarcasterAddress";
import { FarcasterAddressesStorage } from "../storage/farcaster-address/FarcasterAddressesStorage";

export class FarcasterAddresses {
	constructor(
		private readonly logger: Logger,
		private readonly storage: FarcasterAddressesStorage
	) {
		this.logger = logger.child({}, { msgPrefix: "FarcasterAddresses: " });
	}

	async linkAddress(userId: number, address: `0x${string}`) {
		await this.storage.linkAddress(userId, address);
		this.logger.info({userId, address}, 'address linked');
	}

	async getAddress(userId: number): Promise<FarcasterAddress | null> {
		return this.storage.getAddress(userId);
	}
}
