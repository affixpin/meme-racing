import { Logger } from "pino";
import { request } from "undici";
import { z } from "zod";

const getReactionsSchema = z.object({
	messages: z.array(
		z.object({
			data: z.object({
				fid: z.number(),
				reactionBody: z.object({
					type: z.string(),
				}),
			}),
		})
	),
	next_page_token: z.string().optional().nullish(),
});

const getFollowersSchema = z.object({
	data: z.object({
		users: z.array(
			z.object({
				fid: z.number(),
			})
		),
		next_page_token: z.string().optional().nullish(),
	}),
});

export class Pinata {
	constructor(
		private readonly logger: Logger,
		private readonly jwtToken: string,
		private readonly followTargetFID: number
	) {}

	async isFollowing(fid: number, pageToken?: string): Promise<boolean> {
		let text: string = "";
		try {
			const response = await request(
				"https://api.pinata.cloud/v3/farcaster/users",
				{
					headers: {
						authorization: `Bearer ${this.jwtToken}`,
						"content-type": "application/json",
					},
					method: "GET",
					query: {
						fid: this.followTargetFID,
						followers: true,
						pageSize: 100,
						pageToken,
					},
				}
			);

			text = await response.body.text();
			const json = JSON.parse(text);
			const parsed = getFollowersSchema.parse(json);
			if (parsed.data.users.some((user) => user.fid === fid)) {
				return true;
			}
			if (parsed.data.next_page_token) {
				return this.isFollowing(fid, parsed.data.next_page_token);
			}
			return false;
		} catch (e) {
			this.logger.error(e, text);
			return true;
		}
	}

	async includeReaction(
		fid: number,
		creatorFID: number,
		castHash: string,
		reactionType: "REACTION_TYPE_LIKE" | "REACTION_TYPE_RECAST",
		pageToken?: string
	): Promise<boolean> {
		let text: string = "";
		try {
			const query = {
				target_fid: creatorFID,
				target_hash: castHash,
				reaction_type: reactionType,
				pageToken,
				pageSize: 100,
			};

			const response = await request(
				"https://hub.pinata.cloud/v1/reactionsByCast",
				{
					headers: {
						authorization: `Bearer ${this.jwtToken}`,
						"content-type": "application/json",
					},
					method: "GET",
					query,
				}
			);

			text = await response.body.text();
			const json = JSON.parse(text);
			const parsed = getReactionsSchema.parse(json);
			if (parsed.messages.some((m) => m.data.fid === fid)) {
				return true;
			}

			if (parsed.next_page_token) {
				return this.includeReaction(
					fid,
					creatorFID,
					castHash,
					reactionType,
					parsed.next_page_token
				);
			}

			return false;
		} catch (e) {
			this.logger.error(e, text);
			return true;
		}
	}

	async validate(fid: number, _castCreatorFID: number, _castHash: string) {
		const [following] = await Promise.all([
			this.isFollowing(fid),
			// this.includeReaction(fid, castCreatorFID, castHash, "REACTION_TYPE_LIKE"),
			// this.includeReaction(
			// 	fid,
			// 	castCreatorFID,
			// 	castHash,
			// 	"REACTION_TYPE_RECAST"
			// ),
		]);

		return {
			following,
			// liked and recasted are always true due to feedback from the first playtest
			liked: true,
			recasted: true,
		};
	}
}
