import { Model } from "objection";
import { BaseModel } from "./base-model";
import { GameModel } from "./game-model";
import { UserModel } from "./user-model";

export class CommentModel extends BaseModel {
    static get tableName() {
        return 'comments';
    }

    comment!: string;
    rating!: number;
    userId!: number;
    gameId!: number;
    
    author?: UserModel;
    game?: GameModel;

    static get relationMappings() {
        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'comments.userId',
                    to: 'users.id'
                }
            },
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: GameModel,
                join: {
                    from: 'comments.gameId',
                    to: 'games.id'
                }
            }
        }
    }
}