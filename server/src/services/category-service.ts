import { CategoryModel } from "../models/category-model";
import { GameModel } from "../models/game-model";
import { GameCategoryModel } from "../models/game_category-model";
import { GameNotFoundError } from "./game-service";

export class CategoryNotFoundError extends Error { }

class CategoryService {
    async addCategory(name: string) {
        return await CategoryModel.query().insertAndFetch({ name });
    }

    async addGameToCategory(gameId: number, categoryId: number) {
        const game = await GameModel.query().findById(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        const category = await CategoryModel.query().findById(categoryId);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return await GameCategoryModel.query().insertAndFetch({ gameId, categoryId });
    }

    async removeGameFromCategory(gameId: number, categoryId: number) {
        const game = await GameModel.query().findById(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        const category = await CategoryModel.query().findById(categoryId);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        await CategoryModel.query().delete().where({ gameId, categoryId });
    }

    async getCategoryById(categoryId: number) {
        const category = await CategoryModel.query().findById(categoryId);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    }

    async listAll() {
        return await CategoryModel.query().orderBy(['name']);
    }
}

export default new CategoryService();   