import { httpService } from "./http-service";
import { UserModel } from "./user-service";

export interface CommentModel {
    id: number;
    comment: string;
    rating: number;
    author?: UserModel;
}

interface AddCommentInput {
    comment: string;
    rating: number;
}

class CommentService {
    async loadAllComments(): Promise<CommentModel[]> {
        const result = await httpService.get<CommentModel[]>('/comments');

        return result;
    }

    async getCommentsByGameId(gameId: number): Promise<CommentModel[]> {
        const result =
            await httpService.get<CommentModel[]>(`/comments/game/${gameId}`);

        return result;
    }

    async getCommentsByUserId(userId: number): Promise<CommentModel[]> {
        const result =
            await httpService.get<CommentModel[]>(`/comments/user/${userId}`);

        return result;
    }

    async addComment(input: AddCommentInput, gameId: number): Promise<CommentModel> {
        const result = await httpService.post<CommentModel>(`/comments/${gameId}`, {
            body: input
        });

        return result;
    }

    async deleteComment(commentId: number): Promise<void> {
        await httpService.delete<void>(`/comments/${commentId}`, { });
    }
}

export const commentService = new CommentService();