import { Logger } from "pino";

import { delay } from "../utils";
import { Track } from "./Track";

// lap is the period of time between prices updates
export class Laps {
	constructor(
		private readonly logger: Logger,
		private readonly lapPeriod: number,
		private readonly track: Track
	) {}

	async init() {
		this.logger.info(`Laps: ticking every ${this.lapPeriod} ms`);
		while (true) {
			await this.lap();
			await delay(this.lapPeriod);
		}
	}

	private async lap() {
		await this.track.processRacings();
		await this.track.processBettings();
	}
}
