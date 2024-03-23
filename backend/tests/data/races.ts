import { RaceState } from "../../src/entities/Race";
import { assetsInfoProviderIds } from "./assets";

// create data for race, which is ready to be transitioned to final state
export function getRaceCreateData() {
	const start = new Date(0);
	const end = new Date(1);
	const state = RaceState.BETTING;

	return {
		start,
		end,
		state,
		assetsInfoProviderIds,
	};
}
