import { Request, Response, Router } from "express";
import { requestHandler } from "../lib/request-handler";
import auth from "../middlewares/auth-middleware";
import UserService from "../services/user-service";
import { UserTransformer } from "../transformers/user-transformer";

const userTransformer = new UserTransformer();

const userRouter = Router();

userRouter.get('/', auth, requestHandler(async (request: Request, response: Response) => {
    const users = await UserService.getAll();

    response.status(200).json(userTransformer.transformArray(users));
}));

export default userRouter;