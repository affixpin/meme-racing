import * as esbuild from "esbuild";
import { writeFileSync } from "fs";

const metaFile = await esbuild.build({
	external: ["hono-og"],
	inject: ["cjs-shim.ts"],
	metafile: true,
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "dist/index.mjs",
	platform: "node",
	target: "node21.6.2",
	format: "esm",
	sourcemap: true,
});

// write metafile to dist/meta.json
writeFileSync("dist/meta.json", JSON.stringify(metaFile, null, 2));
