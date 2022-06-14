import { Router, Request, Response } from "express";
import { requestHandler } from "../lib/request-handler";
import userService, { DuplicationError, RegisterInputSchema } from "../services/user-service";
import { UserTransformer } from "../transformers/user-transformer";

const userTransformer = new UserTransformer();
const registerRouter = Router();

registerRouter.post('/', requestHandler(async (request: Request, response: Response) => {
    const input = RegisterInputSchema.parse(request.body);

    try {
        const user = await userService.register(input);

        response.status(201).json(userTransformer.transform(user));
    } catch (error) {
        if (error instanceof DuplicationError) {
            response.status(400).json(error);
            return;
        }

        response.status(500).json({ message: 'Internal server error' });
    }
}));

export default registerRouter;