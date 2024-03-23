import { lilconfigSync } from "lilconfig";
import { z } from "zod";

const schema = z.object({
	mongoURI: z.string(),
	cmcApiKey: z.string(),
});

const result = lilconfigSync("test").search();

if (!result) {
	throw new Error("No config found");
}

export const config = schema.parse(result.config);

export type Config = z.infer<typeof schema>;
