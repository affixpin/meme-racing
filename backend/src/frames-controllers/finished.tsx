import { Button, FrameContext, Frog } from "frog";
import Big from "big.js";
import { getContract, zeroAddress } from "viem";

import {
  client,
  farcasterAddresses,
  track,
  trackContract,
} from "../dependencies";
import { ERC20Resource } from "../resources/ERC20Resource";
import { Divider } from "./components/Divider";

export const finishedControllerHandler = async (
  c: FrameContext,
  shortRaceId: string
) => {
  const race = await track.getRaceByDbId(shortRaceId);
  if (!race) return c.res({ image: <h1>Invalid race id {shortRaceId}</h1> });

  const winnerAsset = race.winnerAsset;
  if (!winnerAsset || !winnerAsset.priceChange)
    return c.res({ image: <h1>Too early to show race results</h1> });

  const farcasterAddress = c.frameData
    ? await farcasterAddresses.getAddress(c.frameData.fid)
    : null;
  const address = farcasterAddress?.value ?? zeroAddress;

  const bettingTokenAddress = await trackContract.read.getBettingToken();

  const bettingToken = getContract({
    address: bettingTokenAddress,
    abi: ERC20Resource.abi,
    client,
  });
  const decimals = await bettingToken.read.decimals();

  const totalPotResponse = await trackContract.read.getTotalPot([
    BigInt(race.id),
  ]);

  const totalPot = new Big(totalPotResponse.toString())
    .div(new Big(10).pow(decimals))
    .toString();

  const sign = winnerAsset.priceChange >= 0 ? "+" : "";
  const priceChangePercent =
    sign + (winnerAsset.priceChange * 100).toFixed(2) + "%";

  const claimed = await trackContract.read.getClaimed([
    BigInt(race.id),
    address,
  ]);

  const availableRewards = await trackContract.read.getRewards([
    BigInt(race.id),
    address,
  ]);

  const rewards = new Big((availableRewards + claimed).toString()).div(
    new Big(10).pow(decimals)
  );

  const availableRewardsFormatted = new Big(availableRewards.toString()).div(
    new Big(10).pow(decimals)
  );

  return c.res({
    image: (
      <div
        tw="flex flex-col h-full w-full"
        style={{ backgroundColor: "#09090B" }}
      >
        <div tw="flex flex-col w-full">
          <span
            tw="italic w-full justify-center"
            style={{
              marginTop: 30,
              color: "#FFFFFF",
              fontSize: "48px",
              lineHeight: "60px",
              fontWeight: 700,
            }}
          >
            RACE FINISHED
          </span>
          <div tw="flex justify-center">
            <img
              style={{ marginTop: 10 }}
              height={30}
              src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/winner-is.png"
            />
          </div>
        </div>
        <Divider />
        <div style={{ padding: 20 }} tw="flex flex-col items-center">
          <div
            tw="flex flex-col items-center"
            style={{
              width: 170,
              height: 170,
              borderRadius: 10,
              background: "#11EA5B2E",
            }}
          >
            <img
              width={72}
              height={72}
              src={winnerAsset.imageUrl}
              style={{ marginTop: 18 }}
            />
            <span
              style={{
                color: "#FAFAFA",
                fontSize: 32,
                marginTop: 20,
              }}
            >
              {winnerAsset.name.toUpperCase()}
            </span>
          </div>
          <div
            tw="flex items-center justify-center"
            style={{
              marginTop: "-13px",
              backgroundColor: "#27272AE5",
              borderRadius: 10,
              padding: "3px 7px 3px 7px",
            }}
          >
            <span
              style={{
                color: winnerAsset.priceChange >= 0 ? "#11EA5B" : "#EA4511",
                fontSize: 18,
              }}
            >
              {priceChangePercent}
            </span>
          </div>
        </div>
        <Divider />
        <div tw="flex flex-col w-full" style={{ padding: "0px 60px" }}>
          <div tw="flex flex-col w-full">
            <div
              style={{ padding: "25px 0px 20px 0px" }}
              tw="flex items-center justify-between"
            >
              <span
                style={{
                  color: "#FAFAFA",
                  fontSize: 24,
                }}
              >
                total pool
              </span>
              <div tw="flex items-center">
                <span
                  style={{
                    color: "#FAFAFA",
                    fontFamily: "Inter",
                    weight: 500,
                    fontSize: 24,
                    lineHeight: "30px",
                  }}
                >
                  {totalPot}
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
          </div>
          <Divider />
          <div tw="flex flex-col w-full">
            <div
              style={{ padding: "20px 0px 25px 0px" }}
              tw="flex items-center justify-between"
            >
              <span
                style={{
                  color: "#FAFAFA",
                  fontSize: 24,
                }}
              >
                your reward
              </span>
              <div tw="flex items-center">
                <span
                  style={{
                    color: "#FAFAFA",
                    fontFamily: "Inter",
                    weight: 500,
                    fontSize: 24,
                    lineHeight: "30px",
                  }}
                >
                  {rewards.toString()}
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
          </div>
        </div>
        <div
          tw="flex w-full items-center justify-center"
          style={{ backgroundColor: "#27272A", height: 50 }}
        >
          <span style={{ fontSize: 20, fontWeight: 600, color: "#FAFAFA" }}>
            join
            <span
              style={{
                marginLeft: 3,
                marginRight: 3,
                color: "#11EA5B",
              }}
            >
              /race
            </span>
            channel to find more races!
          </span>
        </div>
      </div>
    ),
    intents: availableRewardsFormatted.gt(0)
      ? [
          <Button.Transaction target={"/tx/claim/" + shortRaceId}>
            🎩 Claim {availableRewardsFormatted.toString()} DEGEN
          </Button.Transaction>,
          <Button value="refresh">Refresh ♻️</Button>,
        ]
      : [<Button value="refresh">Refresh ♻️</Button>],
    browserLocation: "/",
  });
};

export const finishedController = (f: Frog) =>
  f.frame("/finished/:shortRaceId", (c) =>
    finishedControllerHandler(c, c.req.param("shortRaceId"))
  );
