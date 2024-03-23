import { Collection } from "mongodb";

import { Mongo } from "../../mongo";
import { FarcasterAddress } from "../../entities/FarcasterAddress";

export class FarcasterAddressesStorage {
	constructor(private readonly mongo: Mongo) {}

	async getCollection(): Promise<
		Collection<Omit<FarcasterAddress, "id">>
	> {
		const db = await this.mongo.getDB();
		return db.collection<Omit<FarcasterAddress, "id">>("addresses");
	}

	async linkAddress(userId: number, value: `0x${string}`) {
		const col = await this.getCollection();
		await col.updateOne(
			{ userId },
			{ $set: { userId, value } },
			{ upsert: true }
		);
	}

	async getAddress(userId: number): Promise<FarcasterAddress | null> {
		const col = await this.getCollection();
		const entity = await col.findOne({ userId });
		if (!entity) return null;
		return {
			id: entity._id.toString(),
			userId: entity.userId,
			value: entity.value,
		};
	}
}
