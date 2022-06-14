import { httpService } from "./http-service";

export interface GameModel {
    id: number;
    name: string;
    minAge: number;
    userId: number;
    createdAt: string;
    description: string;
    imageUrl: string;
}

interface LoadGamesResponse {
    results: GameModel[];
    total: number;
}

interface CreateGameInput {
    name: string;
    minAge: number;
    description: string;
    imageUrl: string;
    categories: string[];
}

class GameService {
    async loadGames(searchText?: string, page?: string, gamesOnPage?: string)
        : Promise<LoadGamesResponse> {
        const { results, total } = await httpService.get<LoadGamesResponse>('/games', {
            query: { searchText, page, gamesOnPage }
        })

        return { results, total };
    }

    async loadGameById(id: number): Promise<GameModel> {
        const result = await httpService.get<GameModel>(`/games/${id}`);

        return result;
    }

    createGame(input: CreateGameInput): Promise<GameModel> {
        return httpService.post<GameModel>('/games', {
            body: input
        });
    }
}

export const gameService = new GameService();