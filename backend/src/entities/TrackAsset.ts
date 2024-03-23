import { Asset } from "./Asset";

// with track information
export interface TrackAsset extends Asset {
	endPrice?: number;
	startPrice?: number;

	// diff between start and end price
	priceChange?: number;

	// at the moment
	currentPriceChange?: number;
}
