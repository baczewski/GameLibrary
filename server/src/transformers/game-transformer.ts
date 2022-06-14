import { GameModel } from "../models/game-model";

export class GameTransformer {
    transform(game: GameModel) {
        return {
            id: game.id,
            name: game.name,
            minAge: game.minAge,
            userId: game.userId,
            description: game.description,
            imageUrl: game.imageUrl,
            createdAt: game.createdAt
        }
    }

    transformArray(games: GameModel[]) {
        return games.map(game => this.transform(game));
    }
}