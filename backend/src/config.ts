import { lilconfigSync } from "lilconfig";
import { ZodType, z } from "zod";

const hex = z.custom<`0x${string}.+$`>((val) => /^0x.+$/g.test(val as string));

const schema = z.object({
	port: z
		.number()
		.default(process.env.PORT ? parseInt(process.env.PORT) : 8080),
	cmcApiKey: z.string(),
	cmcCacheDuration: z.number(),
	neynarApiKey: z.string(),
	pinataJWT: z.string(),
	nodeURLs: z.array(z.string()),
	trackContractAddress: hex,
	ownerPrivateKey: hex,
	chainId: z.string() as ZodType<any>,
	mongoDatabase: z.string(),
	mongoURI: z.string(),
	lapPeriod: z.number(),
	logLevel: z.string().default("info"),
	logPretty: z.boolean().default(false),
	minBet: z.number(),
	followTargetId: z.number(),

	devServer: z
		.object({
			enabled: z.boolean(),
		})
		.optional(),
});

const envConfig = process.env.APP_CONFIG;
const result = envConfig
	? JSON.parse(envConfig)
	: lilconfigSync("app").search()?.config;

if (!result) {
	throw new Error("No config found");
}

export const config = schema.parse(result);

export type Config = z.infer<typeof schema>;
