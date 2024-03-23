import { serveStatic } from "frog/serve-static";
import { devtools } from "frog/dev";

import { homeController } from "./home";
import { bettingController } from "./betting";
import { createFrog } from "./frog";
import { betTxController } from "./bet-tx";
import { racingController } from "./racing";
import { finishedController } from "./finished";
import { claimTxController } from "./claim-tx";
import { conditionsController } from "./conditions";

const frog = createFrog();

homeController(frog);
conditionsController(frog);
bettingController(frog);
betTxController(frog);
racingController(frog);
finishedController(frog);
claimTxController(frog);

devtools(frog, { serveStatic });

export { frog };
