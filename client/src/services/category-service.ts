import { GameModel } from "./game-service";
import { httpService } from "./http-service";

export interface CategoryModel {
    id: number;
    name: string;
}

export interface GameCategoryModel {
    id: number;
    category?: CategoryModel;
    game?: GameModel;
}

class CategoryService {
    async loadCategories(): Promise<CategoryModel[]> {
        const result = await httpService.get<CategoryModel[]>('/categories');

        return result;
    }

    async getCategoriesByGameId(gameId: number): Promise<GameCategoryModel[]> {
        const result = 
            await httpService.get<GameCategoryModel[]>(`/game-categories/games/${gameId}`);

        return result;
    }

    async getGamesByCategoryId(categoryId: number): Promise<GameCategoryModel[]> {
        const result = 
            await httpService.get<GameCategoryModel[]>(`/game-categories/categories/${categoryId}`);
        
        return result;
    }
}

export const categoryService = new CategoryService();