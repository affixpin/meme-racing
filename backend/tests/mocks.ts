import { AssetsInfoProvider } from "../src/vendors/AssetsInfoProvider";

export const DEFAULT_PRICE = 100;

// first asset changes price according to constants above
export class AssetInfoProviderMock implements AssetsInfoProvider {
	price = DEFAULT_PRICE;

	setFirstAssetPrice(price: number) {
		this.price = price;
	}

	async getInfo(ids: string[]) {
		return ids.map((id, i) => ({
			name: id,
			price: i === 0 ? this.price : DEFAULT_PRICE,
			symbol: id,
			priceChange24h: 0.5,
			imageUrl: id,
		}));
	}

	reset() {
		this.price = DEFAULT_PRICE;
	}
}
