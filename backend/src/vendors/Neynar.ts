import { request } from "undici";
import { z } from "zod";

const validationSchema = z.object({
	action: z.object({
		cast: z.object({
			viewer_context: z
				.object({
					liked: z.boolean(),
					recasted: z.boolean(),
				})
				.default({ liked: true, recasted: true }),
		}),
		interactor: z.object({
			fid: z.number(),
		}),
	}),
});

const userBulkSchema = z.object({
	users: z.array(
		z.object({
			viewer_context: z.object({
				following: z.boolean(),
			}),
		})
	),
});

export class Neynar {
	constructor(
		private readonly apiKey: string,
		private readonly followTargetFID: number
	) {}

	async fetchUserBulk(targetFID: number, viewerFID: number) {
		const response = await request(
			"https://api.neynar.com/v2/farcaster/user/bulk",
			{
				headers: { api_key: this.apiKey, "content-type": "application/json" },
				query: { fids: targetFID, viewer_fid: viewerFID },
			}
		);
		const json = await response.body.json();
		const parsed = userBulkSchema.parse(json);

		return {
			following: parsed.users[0].viewer_context.following,
		};
	}

	async validate(messageHex: string) {
		const response = await request(
			"https://api.neynar.com/v2/farcaster/frame/validate",
			{
				headers: { api_key: this.apiKey, "content-type": "application/json" },
				method: "POST",
				body: JSON.stringify({
					message_bytes_in_hex: messageHex,
					cast_reaction_context: true,
					follow_context: true,
					signer_context: true,
				}),
			}
		);
		const json = await response.body.json();
		const parsed = validationSchema.parse(json);
		const { following } = await this.fetchUserBulk(
			this.followTargetFID,
			parsed.action.interactor.fid
		);

		return {
			following,
			recasted: parsed.action.cast.viewer_context.recasted,
			liked: parsed.action.cast.viewer_context.liked,
		};
	}
}
