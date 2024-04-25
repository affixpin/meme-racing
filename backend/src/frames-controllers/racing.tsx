import { Button, FrameContext, Frog } from "frog";
import Big from "big.js";
import { getContract } from "viem";

import {
  client,
  farcasterAddresses,
  track,
  trackContract,
} from "../dependencies";
import { formatMillis, truncateString } from "../utils";
import { ERC20Resource } from "../resources/ERC20Resource";
import { Divider } from "./components/Divider";
import { RaceState } from "../entities/Race";
import { finishedControllerHandler } from "./finished";

export async function racingControllerHandler(
  c: FrameContext,
  raceShortId: string
) {
  const race = await track.getRaceByDbId(raceShortId);
  if (!race) return c.res({ image: <h1>Invalid race id {raceShortId}</h1> });

  let raceEndsIn = race.end.getTime() - Date.now();
  if (raceEndsIn < 0) raceEndsIn = 0;

  if (race.state !== RaceState.RACING) {
    return finishedControllerHandler(c, raceShortId);
  }

  const bettingTokenAddress = await trackContract.read.getBettingToken();

  const bettingToken = getContract({
    address: bettingTokenAddress,
    abi: ERC20Resource.abi,
    client,
  });
  const decimals = await bettingToken.read.decimals();

  const assets = race.assets.sort((a, b) => {
    if (!a.currentPriceChange) return 1;
    if (!b.currentPriceChange) return -1;
    return b.currentPriceChange - a.currentPriceChange;
  });

  const userBets = await Promise.all(
    assets.map(async (a) => {
      const userId = c.frameData?.fid;
      if (!userId) return "0.00";
      const address = await farcasterAddresses.getAddress(userId);
      // no address -> no bets
      if (!address) return "0.00";

      const userBets = await trackContract.read.getUserBets([
        BigInt(race.id),
        BigInt(a.id),
        address.value,
      ]);
      return new Big(userBets.toString())
        .div(new Big(10).pow(decimals))
        .toString();
    })
  );

  const assetsBets = await Promise.all(
    assets.map(async (a) => {
      const userBets = await trackContract.read.getAssetBets([
        BigInt(race.id),
        BigInt(a.id),
      ]);
      return new Big(userBets.toString())
        .div(new Big(10).pow(decimals))
        .toString();
    })
  );

  return c.res({
    image: (
      <div
        tw="flex flex-col h-full w-full"
        style={{ backgroundColor: "#09090B" }}
      >
        <div tw="flex flex-col w-full">
          <span
            tw="w-full justify-center"
            style={{
              marginTop: 30,
              color: "#2CFFA6",
              fontSize: "48px",
              lineHeight: "60px",
              fontFamily: "Chakra Petch",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            {formatMillis(raceEndsIn)}
          </span>
          <div tw="flex justify-center">
            <img
              style={{ marginTop: 10 }}
              height={30}
              src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/track-countdown.png"
            />
          </div>
        </div>
        <Divider />
        <div style={{ padding: 30 }} tw="flex">
          <span
            tw="justify-center w-full"
            style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 600 }}
          >
            The Race is in Full Flames 🔥
          </span>
        </div>
        <Divider />
        <div tw="flex flex-col w-full" style={{ padding: "20px 0px" }}>
          {assets.map((a, i) => {
            const currentPriceChange = a.currentPriceChange
              ? a.currentPriceChange
              : 0;
            const sign = currentPriceChange >= 0 ? "+" : "";
            const priceChangePercent =
              sign + (currentPriceChange * 100).toFixed(2) + "%";

            return (
              <div tw="flex flex-col w-full">
                <div
                  style={{ padding: 20 }}
                  tw="flex items-center justify-between"
                >
                  <div tw="flex items-center">
                    <span
                      style={{
                        color: "#FAFAFA",
                        fontFamily: "Inter",
                        style: "italic",
                        weight: 500,
                        fontSize: 24,
                        lineHeight: "30px",
                        marginRight: 15,
                      }}
                    >
                      {i + 1}
                    </span>

                    <img
                      width={60}
                      height={60}
                      src={a.imageUrl}
                      style={{ marginLeft: 15 }}
                    />
                    <span
                      style={{
                        color: "#FAFAFA",
                        fontSize: 18,
                        marginLeft: 15,
                      }}
                    >
                      {truncateString(a.name.toUpperCase())}
                    </span>
                    <div
                      tw="flex items-center justify-center"
                      style={{
                        backgroundColor: "#27272AE5",
                        marginLeft: 15,
                        borderRadius: 10,
                        padding: "3px 7px 3px 7px",
                      }}
                    >
                      <span
                        style={{
                          color:
                            currentPriceChange >= 0 ? "#11EA5B" : "#EA4511",
                          fontSize: 18,
                        }}
                      >
                        {priceChangePercent}
                      </span>
                    </div>
                  </div>
                  <div tw="flex items-center">
                    {parseFloat(userBets[i]) > 0 && (
                      <div tw="flex items-center">
                        <span
                          style={{
                            marginRight: 5,
                            color: "#FAFAFA",
                            fontFamily: "Inter",
                            weight: 500,
                            fontSize: 14,
                            lineHeight: "30px",
                          }}
                        >
                          bid
                        </span>
                        <span
                          style={{
                            color: "#FAFAFA",
                            fontFamily: "Inter",
                            weight: 500,
                            fontSize: 24,
                            lineHeight: "30px",
                          }}
                        >
                          {userBets[i]}
                        </span>
                        <span
                          style={{
                            color: "#FAFAFA",
                            opacity: 0.4,
                            fontFamily: "Inter",
                            weight: 500,
                            fontSize: 24,
                            lineHeight: "30px",
                            marginLeft: 5,
                            marginRight: 5,
                          }}
                        >
                          /
                        </span>
                      </div>
                    )}

                    <span
                      style={{
                        color: "#FAFAFA",
                        fontFamily: "Inter",
                        weight: 500,
                        fontSize: 24,
                        lineHeight: "30px",
                      }}
                    >
                      {assetsBets[i]}
                    </span>
                    <img
                      src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/degen-icon.png"
                      width={24}
                      height={24}
                      style={{ marginLeft: 3 }}
                    />
                    <span
                      style={{
                        color: "#A36EFD",
                        fontSize: 14,
                        lineHeight: "30px",
                        marginLeft: 3,
                      }}
                    >
                      DEGEN
                    </span>
                  </div>
                </div>
                {i !== assets.length - 1 ? (
                  <Divider color="divider" />
                ) : (
                  <div tw="flex" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    ),
    intents: [<Button value="refresh">Refresh ♻️</Button>],
    browserLocation: "/",
  });
}

export const racingController = (f: Frog) =>
  f.frame("/racing/:raceShortId", (c) =>
    racingControllerHandler(c, c.req.param("raceShortId"))
  );
