import { z } from "zod";
import { CommentModel } from "../models/comment-model";
import { GameModel } from "../models/game-model";
import { UserModel } from "../models/user-model";
import { GameNotFoundError } from "./game-service";
import { UserNotFoundError } from "./user-service";

export const CommentInputSchema = z.object({
	comment: z.string().min(4, { message: 'Comment needs to be at least 4 chars long' }),
	rating: z.number().positive().max(10, { message: 'Rating needs to be a number in range [0, 10]' }),
});

export type CreateCommentInput = z.infer<typeof CommentInputSchema>;

export class CommentNotFoundError extends Error { }

class CommentService {
	async addComment(input: CreateCommentInput, gameId: number, userId: number) {
		const game = await GameModel.query().findById(gameId);

		if (!game) {
			throw new GameNotFoundError();
		}

		return await CommentModel.query().insertAndFetch({
			comment: input.comment,
			rating: input.rating,
			gameId,
			userId
		});
	}

	async listCommentsByUserId(userId: number) {
		const user = await UserModel.query().findById(userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		return await CommentModel.query()
			.where({ userId })
			.orderBy('rating', "desc")
			.withGraphJoined('author');
	}

	async listCommentsByGameId(gameId: number) {
		const game = await GameModel.query().findById(gameId);

		if (!game) {
			throw new GameNotFoundError();
		}

		return await CommentModel.query().where({ gameId })
			.withGraphJoined('author');
	}

	async deleteCommentById(id: number) {
		const comment = await CommentModel.query().findById(id);

		if (!comment) {
			throw new CommentNotFoundError();
		}

		await CommentModel.query().deleteById(id);
	}
}

export default new CommentService();