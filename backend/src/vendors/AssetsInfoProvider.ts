export interface AssetInfo {
	symbol: string;
	name: string;
	price: number;
	priceChange24h: number;
	imageUrl: string;
}

export interface AssetsInfoProvider {
	getInfo(ids: string[]): Promise<AssetInfo[]>;
}
