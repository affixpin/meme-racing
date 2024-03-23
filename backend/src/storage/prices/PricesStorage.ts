import { Collection } from "mongodb";

import { PricePersistent } from "./PricePersistent";
import { Mongo } from "../../mongo";

type PricePersistentWithoutMongoId = Omit<PricePersistent, "id">;

export class PricesStorage {
	constructor(private readonly mongo: Mongo) {}

	private async getStartPricesCollection(): Promise<
		Collection<PricePersistentWithoutMongoId>
	> {
		const db = await this.mongo.getDB();
		return db.collection<PricePersistentWithoutMongoId>("start-prices");
	}

	private async getEndPricesCollection(): Promise<
		Collection<PricePersistentWithoutMongoId>
	> {
		const db = await this.mongo.getDB();
		return db.collection<PricePersistentWithoutMongoId>("end-prices");
	}

	async addStartPrice(raceId: string, assetId: number, value: number) {
		const col = await this.getStartPricesCollection();
		await col.updateOne(
			{ raceId, assetId },
			{ $set: { assetId, value, raceId } },
			{ upsert: true }
		);
	}

	async getStartPrice(
		raceId: string,
		assetId: number
	): Promise<PricePersistent | null> {
		const col = await this.getStartPricesCollection();
		const entity = await col.findOne({ raceId, assetId });
		if (!entity) return null;
		return { id: entity._id.toString(), raceId, assetId, value: entity.value };
	}

	async addEndPrice(raceId: string, assetId: number, value: number) {
		const col = await this.getEndPricesCollection();
		await col.updateOne(
			{ raceId, assetId },
			{ $set: { raceId, assetId, value } },
			{ upsert: true }
		);
	}

	async getEndPrice(raceId: string, assetId: number): Promise<PricePersistent | null> {
		const col = await this.getEndPricesCollection();
		const entity = await col.findOne({ assetId, raceId });
		if (!entity) return null;
		return {
			id: entity._id.toString(),
			raceId: entity.raceId,
			assetId,
			value: entity.value,
		};
	}
}
