import { RankingModel } from "../models/ranking-model";

export class RankingTransformer {
    transform(ranking: RankingModel) {
        return {
            id: ranking.id,
            name: ranking.name
        }
    }

    transformArray(rankings: RankingModel[]) {
        return rankings.map(ranking => this.transform(ranking));
    }
}