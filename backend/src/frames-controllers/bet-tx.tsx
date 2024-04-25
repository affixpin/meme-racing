import Big from "big.js";
import { Frog } from "frog";
import { getContract } from "viem";

import { approveTxController } from "./approve-tx";
import {
  client,
  farcasterAddresses,
  logger,
  track,
  trackContract,
} from "../dependencies";
import { config } from "../config";
import { TrackResource } from "../resources/TrackResource";
import { ERC20Resource } from "../resources/ERC20Resource";

const betLogger = logger.child({}, { msgPrefix: "bet tx: " });

export const betTxController = (f: Frog) =>
  f.transaction("/tx/bet/:raceShortId", async (c) => {
    if (!c.frameData) throw new Error("No frameData");
    const l = betLogger.child({ fid: c.frameData.fid });

    const { inputText, buttonIndex } = c;
    await farcasterAddresses.linkAddress(
      c.frameData.fid,
      c.address as `0x${string}`
    );

    const assetID = buttonIndex ? buttonIndex - 1 : 0;

    const bettingTokenAddress = await trackContract.read.getBettingToken();

    const bettingToken = getContract({
      address: bettingTokenAddress,
      abi: ERC20Resource.abi,
      client,
    });

    const decimals = await bettingToken.read.decimals();
    const allowance = await bettingToken.read.allowance([
      c.address as `0x${string}`,
      trackContract.address,
    ]);
    const balance = await bettingToken.read.balanceOf([
      c.address as `0x${string}`,
    ]);

    const multiplier = new Big(10).pow(decimals);
    const inputFloat = inputText ? parseFloat(inputText) : 0;

    if (inputFloat < config.minBet) {
      l.info({ inputFloat }, "Minimum bet is " + config.minBet);
      return c.error({ message: "Minimum bet is " + config.minBet });
    }

    const betValueBig = multiplier.mul(inputFloat);
    const betValueFixed = betValueBig.toFixed();
    l.info({ betValueFixed }, "Bet value fixed");

    const betValue = BigInt(betValueFixed);
    l.info({ betValue }, "Bet value");

    if (balance < betValue) {
      l.info({ balance, betValue }, "insufficient balance");
      return c.error({ message: "Insufficient balance" });
    }

    if (new Big(allowance.toString()).lt(betValueBig)) {
      l.info({ allowance, betValueBig }, "approving");
      return approveTxController(c, betValue * 10n);
    }

    if (inputFloat < config.minBet) {
      l.info({ inputFloat }, "minimum bet is " + config.minBet);
      return c.error({ message: "Minimum bet is " + config.minBet });
    }

    const race = await track.getRaceByDbId(c.req.param("raceShortId"));
    if (!race) throw new Error("No race");

    const args = [BigInt(race.id), BigInt(assetID), betValue] as const;
    l.info({ args }, "contract call");

    // Send transaction response.
    return c.contract({
      attribution: false,
      abi: TrackResource.abi,
      chainId: config.chainId,
      functionName: "bet",
      args,
      to: trackContract.address,
    });
  });
