import { expect, test } from "vitest";

import { CMC } from "../src/vendors/CMC";
import { config } from "./config";
import { assetsInfoProviderIds } from "./data/assets";

test("gets assets info", async () => {
	const cmc = new CMC(config.cmcApiKey);
	const assetsInfo = await cmc.getInfo(assetsInfoProviderIds);

	assetsInfo.forEach((assetInfo) => {
		expect(assetInfo).toEqual({
			symbol: expect.any(String),
			name: expect.any(String),
			price: expect.any(Number),
			priceChange24h: expect.any(Number),
			imageUrl: expect.any(String),
		});
	});
});
