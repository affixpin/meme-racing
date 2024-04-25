import { Button, Frog } from "frog";

export const homeController = (f: Frog) =>
  f.frame("/:raceShortId", async (c) => {
    const raceShortId = c.req.param("raceShortId");
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
            style={{ marginTop: 170, marginBottom: 70 }}
            width={126}
            src="https://meme-racing.ams3.cdn.digitaloceanspaces.com/logo.png"
          />
          <div tw="flex">
            <span style={{ fontSize: 24, fontWeight: 600, color: "#FAFAFA" }}>
              click the button to start
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
      intents: [<Button action={"/conditions/" + raceShortId}>Start</Button>],
      browserLocation: "/",
    });
  });
