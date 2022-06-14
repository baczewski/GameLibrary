import { BaseModel } from "./base-model";

export class GameRankingModel extends BaseModel {
    static get tableName() {
        return 'game_rankings';
    }

    gameId!: number;
    rankingId!: number;
}