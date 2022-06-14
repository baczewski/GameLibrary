import { GameCategoryModel } from "../models/game_category-model";

export class GameCategoryTransformer {
    transform(gameCategory: GameCategoryModel) {
        return {
            id: gameCategory.id,
            game: gameCategory?.game,
            category: gameCategory?.category
        }
    }

    transformArray(gameCategories: GameCategoryModel[]) {
        return gameCategories.map(gameCategory => this.transform(gameCategory));
    }
}