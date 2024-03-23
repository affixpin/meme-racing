import { WithId } from "mongodb";

export enum RaceState {
	BETTING,
	RACING,
	FINISHED,
}

export interface CreateRaceData {
	start: Date;
	end: Date;
	state: RaceState;

	assetsInfoProviderIds: string[];
}

export interface RaceBase extends CreateRaceData {
	id: string;
}

export type RaceCollectionItem = WithId<RaceBase>;

export interface RacePersistent extends RaceBase {
	shortId: string;
}
