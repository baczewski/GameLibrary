import { Model } from "objection";
import { BaseModel } from "./base-model";
import { UserModel } from "./user-model";

export class GameModel extends BaseModel {
    static get tableName() {
        return 'games';
    }

    name!: string;
    minAge!: number;
    userId!: number;
    description!: string;
    imageUrl!: string;

    creator?: UserModel;

    static get relationMappings() {
        return {
            creator: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'games.userId',
                    to: 'users.id'
                }
            }
        }
    }
}