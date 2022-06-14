import { Model } from "objection";
import { BaseModel } from "./base-model";
import { GameModel } from "./game-model";

export class RankingModel extends BaseModel {
    static get tableName() {
        return 'rankings';
    }

    name!: string;
    games?: GameModel[];

    relationMappings() {
        return {
            games: {
                relation: Model.ManyToManyRelation,
                modelClass: GameModel,
                join: {
                    from: 'rankings.id',
                    through: {
                        from: 'game_rankings.rankingId',
                        to: 'game_rankings.gameId'
                    },
                    to: 'games.id'
                }
            }
        }
    }
}