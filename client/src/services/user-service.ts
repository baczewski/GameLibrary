import { HttpError, httpService } from "./http-service";

export interface UserModel {
    id: string;
    username: string;
}

interface CreateUserInput {
    name: string;
    age: number;
    password: string;
}

export class DuplicateUsernameError extends Error { }

class UserService {
    loadUsers(): Promise<UserModel[]> {
        return httpService.get<UserModel[]>('/users');
    }

    async createUser(input: CreateUserInput): Promise<UserModel> {
        console.log('ehe')
        const result = await httpService.post<UserModel>('/register', {
            body: input
        });

        return result;
    }
}

export const userService = new UserService();