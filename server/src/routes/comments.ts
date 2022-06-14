import { Request, Response, Router } from "express";
import { z } from "zod";
import { requestHandler } from "../lib/request-handler";
import auth, { currentUser } from "../middlewares/auth-middleware";
import commentService, { CommentInputSchema, CommentNotFoundError } from "../services/comment-service";
import { GameNotFoundError } from "../services/game-service";
import { UserNotFoundError } from "../services/user-service";
import { CommentTransformer } from "../transformers/comment-transformer";

const commentsRouter = Router();
const commentTransformer = new CommentTransformer();

commentsRouter.post('/:id',
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const input = CommentInputSchema.parse(request.body);
        const gameId = z.number().parse(Number.parseInt(request.params.id));
        const user = currentUser(response);
        // TODO: validation zod

        try {
            const commentResponse =
                await commentService.addComment({
                    comment: input.comment,
                    rating: Number(input.rating)
                }, gameId, user.id);

            response.status(200).json(commentTransformer.transform(commentResponse));
        } catch (error) {
            if (error instanceof GameNotFoundError) {
                response.status(404).json({ message: 'No such game exists.' });
                return;
            }

            response.status(500).json({ message: 'Internal server error' });
        }
    })
);

commentsRouter.get('/game/:id',
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const gameId = z.number().parse(Number.parseInt(request.params.id));

        try {
            const gameComments = await commentService.listCommentsByGameId(gameId);

            response.status(200).json(commentTransformer.transformArray(gameComments));
        } catch (error) {
            if (error instanceof GameNotFoundError) {
                response.status(404).json({ message: 'No such game exists.' });
                return;
            }

            response.status(500).json({ message: 'Internal server error' });
        }
    })
);

commentsRouter.get('/user/:id',
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const userId = z.number().parse(Number.parseInt(request.params.id));

        try {
            const userComments = await commentService.listCommentsByUserId(userId);

            response.status(200).json(commentTransformer.transformArray(userComments));
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                response.status(404).json({ message: 'No such user exists.' });
                return;
            }

            response.status(500).json({ message: 'Internal server error' });
        }
    })
);

commentsRouter.delete('/:id',
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const gameId = z.number().parse(Number.parseInt(request.params.id));

        try {
            commentService.deleteCommentById(gameId);

            response.status(200).json({ message: 'Comment deleted.' });
        } catch (error) {
            if (error instanceof CommentNotFoundError) {
                response.status(404).json({ message: 'No such comment exists.' });
                return;
            }

            response.status(500).json({ message: 'Internal server error' });
        }
    })
);

export default commentsRouter;