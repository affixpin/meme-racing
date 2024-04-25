import { Button, Frog } from "frog";

import { pinata } from "../dependencies";
import { bettingControllerHandler } from "./betting";

// null if conditions are met
// async function checkConditionsNeynar(messageBytes: string): Promise<{
//   buttonText: string;
// } | null> {
//   const validation = await neynar.validate(messageBytes);
//
//   if (!validation.following) return { buttonText: "Follow to play" };
//
//   if (!validation.recasted) return { buttonText: "Recast to play" };
//
//   if (!validation.liked) return { buttonText: "Like to play" };
//
//   return null;
// }

async function checkConditionsPinata(
  fid: number,
  creatorFID: number,
  castHash: string
): Promise<{
  buttonText: string;
} | null> {
  const validation = await pinata.validate(fid, creatorFID, castHash);

  if (!validation.following) return { buttonText: "Follow to play" };

  if (!validation.recasted) return { buttonText: "Recast to play" };

  if (!validation.liked) return { buttonText: "Like to play" };

  return null;
}

export const conditionsController = (f: Frog) =>
  f.frame("/conditions/:raceShortId", async (c) => {
    if (!c.frameData)
      return c.res({
        image: <h1>Something went wrong. No frame data.</h1>,
      });

    const raceId = c.req.param("raceShortId");
    const condinitionsNotMet = await checkConditionsPinata(
      c.frameData.fid,
      c.frameData.castId.fid,
      c.frameData.castId.hash
    );

    if (!condinitionsNotMet) {
      return bettingControllerHandler(c, raceId);
    }

    return c.res({
      image: (
        <div
          tw="flex flex-col w-full h-full items-center"
          style={{
            backgroundColor: "#09090B",
            backgroundImage:
              "url(https://meme-racing.ams3.cdn.digitaloceanspaces.com/home-background.png)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            style={{ marginTop: 80, marginBottom: 70 }}
            width={126}
            src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/logo.png"
          />

          <div tw="flex">
            <span style={{ fontSize: 25, fontWeight: 600, color: "#FAFAFA" }}>
              Bid on the fastest-moving memecoin –
            </span>
          </div>
          <div tw="flex">
            <span style={{ fontSize: 25, fontWeight: 600, color: "#FAFAFA" }}>
              win $DEGEN!
            </span>
          </div>
          <div tw="flex">
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                marginTop: 30,
                color: "#FAFAFA",
              }}
            >
              Follow
              <span style={{ marginLeft: 3, color: "#11EA5B", marginRight: 3 }}>
                @degen-racing
              </span>
              to play
            </span>
          </div>
          <img
            style={{ marginTop: 30 }}
            width={30}
            height={30}
            src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/arrow-down.png"
          />
        </div>
      ),
      intents: [
        condinitionsNotMet ? (
          <Button>{condinitionsNotMet?.buttonText}</Button>
        ) : (
          <Button action={"/betting/" + raceId}>Play</Button>
        ),
      ],
      browserLocation: "/",
    });
  });
