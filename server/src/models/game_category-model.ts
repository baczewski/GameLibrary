import { Model } from "objection";
import { BaseModel } from "./base-model";
import { CategoryModel } from "./category-model";
import { GameModel } from "./game-model";

export class GameCategoryModel extends BaseModel {
    static get tableName() {
        return 'game_categories';
    }

    gameId!: number;
    categoryId!: number;

    game?: GameModel;
    category?: CategoryModel;

    static get relationMappings() {
        return {
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: GameModel,
                join: {
                    from: 'game_categories.gameId',
                    to: 'games.id'
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: CategoryModel,
                join: {
                    from: 'game_categories.categoryId',
                    to: 'categories.id'
                }
            }
        }
    }
}