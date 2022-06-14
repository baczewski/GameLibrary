import { GameModel } from "../models/game-model";
import { GameRankingModel } from "../models/game_ranking-model";
import { RankingModel } from "../models/ranking-model";
import { GameNotFoundError } from "./game-service";

export class RankingNotFoundError extends Error { }

class RankingService {
    async addRanking(name: string) {
        return await RankingModel.query().insertAndFetch({ name }); 
    }

    async deleteRankingById(id: number) {
        const ranking = await RankingModel.query().findById(id);

        if (!ranking) {
            throw new RankingNotFoundError();
        }

        await RankingModel.query().deleteById(id);
    }

    async addGameToRankingById(gameId: number, rankingId: number) {
        const game = await GameModel.query().findById(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        const ranking = await RankingModel.query().findById(rankingId);

        if (!ranking) {
            throw new RankingNotFoundError();
        }

        await GameRankingModel.query().insert({ gameId, rankingId });
    }

    async removeGameFromRankingById(gameId: number, rankingId: number) {
        const game = await GameModel.query().findById(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        const ranking = await RankingModel.query().findById(rankingId);

        if (!ranking) {
            throw new RankingNotFoundError();
        }

        return await GameRankingModel.query().delete().where({ gameId, rankingId });
    }

    async listAll() {
        return await RankingModel.query().orderBy(['name']);
    }
}

export default new RankingService();