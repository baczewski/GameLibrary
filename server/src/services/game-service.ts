import { Model } from "objection";
import { z } from "zod";
import { CategoryModel } from "../models/category-model";
import { GameModel } from "../models/game-model";
import { GameCategoryModel } from "../models/game_category-model";

export class GameNotFoundError extends Error { }

export const GameInputSchema = z.object({
    name: z.string().min(4, { message: 'Name needs to be atleast 4 chars long' }),
    minAge: z.number().positive({ message: 'Min age needs to be possitive number' }),
    description: z.string().min(10, { message: 'Description needs to be at least 10 chars long' }),
    categories: z.array(z.string()).min(1, { message: 'At least one category needs to be selected' }),
    imageUrl: z.string().optional()
});

export type CreateGameInput = z.infer<typeof GameInputSchema>;

class GameService {
    async createGame(input: CreateGameInput, userId: number) {
        return await Model.transaction(async t => {
            const game = await GameModel.query().insertAndFetch({
                name: input.name,
                minAge: input.minAge,
                description: input.description,
                imageUrl: input.imageUrl,
                userId
            });

            const categories = [];

            for (const categoryName of input.categories) {
                const category = await CategoryModel.query(t)
                    .insert({ name: categoryName })
                    .onConflict('name')
                    .merge();

                categories.push(category);
            }

            const gameCategories = categories.map((category) => ({
                gameId: game.id,
                categoryId: category.id
            }));

            await GameCategoryModel.query(t).insert(gameCategories);

            return game;
        });
    }

    async getGameById(id: number) {
        const game = await GameModel.query().findById(id);

        if (!game) {
            throw new GameNotFoundError();
        }

        return game;
    }

    async list({
        page,
        gamesPerPage,
        searchText
    }: {
        page: number;
        gamesPerPage: number;
        searchText?: string;
    }) {
        let result = GameModel.query()
            .orderBy(['name', 'id'])
            .page(page, gamesPerPage);
        
        if (searchText) {
            result = result.where('name', 'ilike', `%${searchText.replace('%', '')}%`);
        }

        return await result;
    }

    async deleteGameById(id: number) {
        const game = await GameModel.query().findById(id);

        if (!game) {
            throw new GameNotFoundError();
        }

        await GameModel.query().deleteById(id);
    }

    async listGameById(id: number) {
        const game = await GameModel.query().findById(id);

        if (!game) {
            throw new GameNotFoundError();
        }

        return game;
    }

    async updateGameById(id: number, name: string, minAge: number, userId: number) {
        const game = await GameModel.query().findById(id);

        if (!game) {
            throw new GameNotFoundError();
        }

        return await GameModel.query().patchAndFetchById(id, { name, minAge, userId });
    }

    async updateGameMinAgeById(id: number, minAge: number) {
        return await GameModel.query().patchAndFetchById(id, { minAge });
    }
}

export default new GameService();