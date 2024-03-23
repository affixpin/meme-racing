import { Race } from "./Race";
import { TrackAsset } from "./TrackAsset";

// with track information
export interface TrackRace extends Race {
	assets: TrackAsset[];
	winnerAsset?: TrackAsset;
}
