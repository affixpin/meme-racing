import { serve } from "@hono/node-server";
import { serveStatic } from "frog/serve-static";

import { frog } from "./frames-controllers";
import { init, logger } from "./dependencies";
import { config } from "./config";
import { createFrog } from "./frames-controllers/frog";

const root = createFrog();

root.route("/frames", frog);

// health check
root.get("/", (c) =>
	c.html(
		<html>
			<head>
				<title>degen.racing</title>
			</head>
			<body style="display:flex;justify-content:center;background-color:#09090B;width:100%">
				<a href="https://warpcast.com/~/channel/race">
					<img alt="index" src="/index.jpg" width="500em"/>
				</a>
			</body>
		</html>
	)
);

root.use("/*", serveStatic({ root: "./public" }));

// disable serve in development, conflicts with devtools
if (process.env.NODE_ENV !== "development") {
	serve({
		fetch: root.fetch,
		port: config.port,
	});
}

export const app = root;

init();

logger.info({ port: config.port }, "Server: started");
