import { config as convictConfig } from '../../config';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user-model';
import { z } from 'zod';

export class UserNotFoundError extends Error { }

export class DuplicationError extends Error {
    fieldErrors: { [key: string]: [string] } = {};
    constructor(fieldErrors: { [key: string]: [string] }) {
        super('Duplication error');
        this.fieldErrors = fieldErrors;
    }
}

export interface User {
    name: string;
    password: string;
    age: number;
}

export const LoginInputSchema = z.object({
    name: z.string().min(1),
    password: z.string().min(4)
});

export const RegisterInputSchema = z.object({
    name: z.string().min(4, { message: 'Name needs to be at least 4 characters long' }),
    password: z.string().min(4, { message: 'Name needs to be at least 4 characters long'}),
    age: z.number().min(2, { message: 'Age needs to be at least 2' })
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
export type RegisterInput = z.infer<typeof RegisterInputSchema>;

class UserService {
    async register({ name, password: plainTextPassword, age }: RegisterInput) {
        const salt_rounds = convictConfig.get('crypt.salt_rounds');
        const password = await bcrypt.hash(plainTextPassword, salt_rounds);

        const existingUser = await UserModel.query().findOne({ name });

        if (existingUser) {
            throw new DuplicationError({ name: ['Username already exists.'] });
        }

        const user = await UserModel.query().insertAndFetch({
            name, password, age
        });

        return user;
    }

    async login({ name, password }: LoginInput) {
        console.log('suss')
        const user = await UserModel.query().findOne({ name });
        console.log(user)

        if (user) {
            const passwordComparison = await bcrypt.compare(password, user.password);
            return passwordComparison ? user : undefined;
        }

        return undefined;
    }

    async getUserById(userId: number) {
        const user = await UserModel.query().findById(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async getAll() {
        return await UserModel.query().orderBy(['name']);
    }
}

export default new UserService();