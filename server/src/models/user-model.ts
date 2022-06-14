import { Model } from "objection";
import { BaseModel } from "./base-model";
import { GameModel } from "./game-model";

export class UserModel extends BaseModel {
    static get tableName() {
        return 'users';
    }

    id!: number;
    name!: string;
    password!: string;
    age!: number;
    gamesCreatedByUser?: GameModel[];

    static get relationMappings() {
        return {
            gamesCreatedByUser: {
                relation: Model.HasManyRelation,
                modelClass: GameModel,
                join: {
                    from: 'users.id',
                    to: 'games.userId'
                }
            }
        }
    }
}