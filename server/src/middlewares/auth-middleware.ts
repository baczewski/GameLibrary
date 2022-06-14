import { UserTransformer } from "../transformers/user-transformer";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { config } from "../../config";
import { UserModel } from "../models/user-model";
import UserService from "../services/user-service";

const userTransformer = new UserTransformer();

const verify = (token: string, key: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(decoded);
        });
    });
}

export default async function auth(request: Request, response: Response, next: () => void) {
    const token = request.headers.authorization;
    const jwtKey = config.get('server.jwt_key');

    if (!token) {
        response.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const [tokenType, jwtToken] = token.split(' ');

    if (tokenType !== 'Bearer') {
        response.status(400).json({ error: 'Invalid token type' });
        return;
    }

    try {
        const decodedUser = await verify(jwtToken, jwtKey) as UserModel;
        const transformedUser = userTransformer.transform(decodedUser);

        const user = await UserService.getUserById(transformedUser.id);

        if (!user) {
            response.status(401).json({ error: 'Unauthorized' });
            return;
        }

        response.locals.user = user;

        next();
    } catch (error) {
        response.status(400).json({ error: 'Invalid token' });
    }
}

export function currentUser(response: Response): UserModel {
    return response.locals.user;
}