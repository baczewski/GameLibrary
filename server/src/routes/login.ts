import { Request, Response, Router } from "express";
import { config } from "../../config";
import UserService, { LoginInputSchema } from "../services/user-service";
import jwt from 'jsonwebtoken';
import { UserTransformer } from "../transformers/user-transformer";
import { requestHandler } from "../lib/request-handler";

const loginRouter = Router();
const userTransformer = new UserTransformer();

loginRouter.post('/', requestHandler(async (request: Request, response: Response) => {
    const input = LoginInputSchema.parse(request.body);
    const jwtKey = config.get('server.jwt_key');

    const user = await UserService.login(input);

    if (!user) {
        response.status(401).json({ message: 'Unauthorized access' });
        return;
    }

    const targetUser = userTransformer.transform(user);

    const token = jwt.sign(targetUser, jwtKey, { expiresIn: '24h' });

    response.status(200).json({ token });
}));

export default loginRouter;