import { MongoClient } from "mongodb";

export class Mongo {
	private client?: MongoClient;

	constructor(
		private readonly connectionURI: string,
		private readonly databaseName: string
	) {}

	async getDB() {
		if (!this.client) {
			this.client = new MongoClient(this.connectionURI);
			await this.client.connect();
		}

		return this.client.db(this.databaseName);
	}

	async close() {
		if (this.client) {
			await this.client.close();
		}
	}

	async cleanup() {
		if (this.client) {
			const db = await this.getDB();
			await db.dropDatabase();
		}
	}
}
