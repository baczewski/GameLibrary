import { CommentModel } from "../models/comment-model";

export class CommentTransformer {
    transform(comment: CommentModel) {
        return {
            id: comment.id,
            comment: comment.comment,
            rating: comment.rating,
            author: {
                id: comment.author?.id,
                username: comment.author?.name
            }
        }
    }

    transformArray(comments: CommentModel[]) {
        return comments.map(comment => this.transform(comment));
    }
}