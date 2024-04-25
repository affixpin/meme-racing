import { Frog } from "frog";

import { track, trackContract } from "../dependencies";
import { config } from "../config";
import { TrackResource } from "../resources/TrackResource";

export const claimTxController = (f: Frog) =>
  f.transaction("/tx/claim/:raceShortId", async (c) => {
    const race = await track.getRaceByDbId(c.req.param("raceShortId"));
    if (!race) throw new Error("No race");

    // Send transaction response.
    return c.contract({
      attribution: false,
      abi: TrackResource.abi,
      chainId: config.chainId,
      functionName: "claim",
      args: [BigInt(race.id)],
      to: trackContract.address,
    });
  });
