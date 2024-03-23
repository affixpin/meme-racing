import { Collection, ObjectId } from "mongodb";
import { Logger } from "pino";

import {
	RaceState,
	RacePersistent,
	RaceCollectionItem,
	RaceBase,
	CreateRaceData,
} from "./RacePersistent";
import { Mongo } from "../../mongo";
import { generateId } from "../../utils";

export class RacesStorage {
	constructor(
		private readonly logger: Logger,
		private readonly mongo: Mongo
	) {
		this.logger = logger.child({}, { msgPrefix: "Races storage: " });
	}

	async getCollection(): Promise<Collection<RaceBase>> {
		const db = await this.mongo.getDB();
		return db.collection("races");
	}

	private mapToPersistent(v: RaceCollectionItem): RacePersistent {
		return {
			state: v.state,
			id: v.id,
			shortId: v._id.toString(),
			start: v.start,
			end: v.end,
			assetsInfoProviderIds: v.assetsInfoProviderIds,
		};
	}

	async getByDbId(shortId: string): Promise<RacePersistent | null> {
		const col = await this.getCollection();
		const entity = await col.findOne({
			_id: ObjectId.createFromHexString(shortId),
		});
		if (!entity) return null;
		return this.mapToPersistent(entity);
	}

	async getById(id: string): Promise<RacePersistent | null> {
		const col = await this.getCollection();
		const entity = await col.findOne({ id });
		if (!entity) return null;
		return this.mapToPersistent(entity);
	}

	async getLast(): Promise<RacePersistent | null> {
		const col = await this.getCollection();
		const entity = await col.findOne({}, { sort: { _id: -1 } });
		if (!entity) return null;
		return this.mapToPersistent(entity);
	}

	async getByState(state: RaceState): Promise<RacePersistent[]> {
		const col = await this.getCollection();
		const values = await col.find({ state }).toArray();
		return values.map((v) => this.mapToPersistent(v));
	}

	async updateState(id: string, state: RaceState): Promise<void> {
		const col = await this.getCollection();
		await col.updateOne({ id }, { $set: { state } });
	}

	async create(createData: CreateRaceData): Promise<RacePersistent> {
		const col = await this.getCollection();
		const result = await col.insertOne({
			id: generateId().toString(),
			...createData,
		});
		const created = await col.findOne({ _id: result.insertedId });
		if (!created) throw new Error("Not created");
		return { ...created, shortId: created._id.toString() };
	}

	private async fillUpDefaultSchedule() {
		const l = this.logger.child({}, { msgPrefix: "default schedule - " });

		const scheduleSize = 10;
		const durationTime = 1000 * 60 * 60 * 8;
		const breakTime = 1000 * 60 * 60;

		const col = await this.getCollection();
		const left = await col.countDocuments({ start: { $gt: new Date() } });

		if (left >= scheduleSize / 2) {
			l.info({ left, scheduleSize }, "schedule is already filled up");
			return;
		}
		l.info({ left, scheduleSize }, "filling up schedule");

		const last = await col.findOne({}, { sort: { _id: -1 } });
		const lastDate = new Date(last ? last.end.getTime() : Date.now());
		lastDate.setMinutes(0, 0, 0);
		const lastTime = lastDate.getTime();

		const data = [];

		for (let i = 0; i < scheduleSize; i++) {
			const start = new Date(lastTime + i * (durationTime + breakTime));
			const end = new Date(start.getTime() + durationTime);

			data.push({
				id: generateId().toString(),
				start,
				end,
				state: RaceState.BETTING,
				assetsInfoProviderIds: ["29743", "30096", "27750"],
			});
		}

		await col.insertMany(data);
		l.info({ scheduleSize }, "schedule filled up");
	}

	async init() {
		await this.fillUpDefaultSchedule();
	}
}
