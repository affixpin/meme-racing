import { request } from "undici";
import pMemoize from "p-memoize";
import ExpiryMap from "expiry-map";
import { createMutiplicableDelay, retryAsync } from "ts-retry";
import { z } from "zod";

import { AssetInfo, AssetsInfoProvider } from "./AssetsInfoProvider";

const coinReponseSchema = z.object({
  data: z.record(
    z.string(),
    z.object({
      symbol: z.string(),
      name: z.string(),
      quote: z.object({
        USD: z.object({
          price: z.number(),
          percent_change_24h: z.number(),
        }),
      }),
    })
  ),
});

export class CMC implements AssetsInfoProvider {
  constructor(
    private readonly apiKey: string,
    cacheDuration: number = 60000
  ) {
    const expiry = new ExpiryMap(cacheDuration);
    this._fetchCoinInfo = pMemoize(this._fetchCoinInfo, {
      cache: expiry,
      // array -> primitive type, so we can use it as a key
      cacheKey: (ids) => ids.join(""),
    }).bind(this);
  }

  private async _fetchCoinInfo(ids: string[]) {
    const { body } = await request(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest",
      {
        headers: { "X-CMC_PRO_API_KEY": this.apiKey },
        query: { id: ids.join(",") },
      }
    );
    const json = await body.json();
    return coinReponseSchema.parse(json);
  }

  async getInfo(ids: string[]): Promise<AssetInfo[]> {
    const coin = await retryAsync(() => this._fetchCoinInfo(ids), {
      maxTry: 5,
      delay: createMutiplicableDelay(10000, 2),
    });

    return ids.map((id) => ({
      symbol: coin.data[id].symbol,
      name: coin.data[id].name,
      price: coin.data[id].quote.USD.price,
      priceChange24h: coin.data[id].quote.USD.percent_change_24h,
      imageUrl: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`,
    }));
  }
}
