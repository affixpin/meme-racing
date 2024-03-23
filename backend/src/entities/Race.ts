import { RaceState } from "../storage/race/RacePersistent";
import { Asset } from "./Asset";

export interface Race {
	id: string;
	shortId: string;
	start: Date;
	end: Date;
	state: RaceState;
	assets: Asset[];
}

export { RaceState };
