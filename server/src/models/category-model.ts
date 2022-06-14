import { Model } from "objection";
import { BaseModel } from "./base-model";
import { GameModel } from "./game-model";

export class CategoryModel extends BaseModel {
    static get tableName() {
        return 'categories';
    }

    name!: string;
    games?: GameModel[];

    relationMappings() {
        return {
            games: {
                relation: Model.ManyToManyRelation,
                modelClass: GameModel,
                join: {
                    from: 'categories.game_id',
                    through: {
                        from: 'game_categories.categoryId',
                        to: 'game_categories.gameId'
                    },
                    to: 'games.id'
                }
            }
        }
    }
}