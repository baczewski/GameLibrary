import { CategoryModel } from "../models/category-model";
import { GameModel } from "../models/game-model";
import { GameCategoryModel } from "../models/game_category-model";
import { CategoryNotFoundError } from "./category-service";
import { GameNotFoundError } from './game-service';

class GameCategoryService {
    async getCategoriesByGameId(gameId: number) {
        const game = await GameModel.query().findById(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        return await GameCategoryModel
            .query()
            .withGraphJoined('category')
            .where('gameId', gameId);
    }

    async getGamesByCategoryId(categoryId: number) {
        const category = await CategoryModel.query().findById(categoryId);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return await GameCategoryModel
            .query()
            .withGraphJoined('game')
            .where('categoryId', categoryId);
    }
}

export const gameCategoryService = new GameCategoryService();