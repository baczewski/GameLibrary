import { Request, Response, Router } from "express";
import { UniqueViolationError } from "objection";
import { transformer, z } from "zod";
import { requestHandler } from "../lib/request-handler";
import auth, { currentUser } from "../middlewares/auth-middleware";
import gameService, { GameInputSchema, GameNotFoundError } from "../services/game-service";
import { GameTransformer } from "../transformers/game-transformer";

const gamesRouter = Router();
const gameTransformer = new GameTransformer();

gamesRouter.get('/', auth, requestHandler(async (request: Request, response: Response) => {
    const { page, searchText, gamesOnPage } = request.query;

    const pageNumber = Number(page) ? Number(page) - 1 : 0;
    const gamesPerPage = Number(gamesOnPage) || 3;
    const search = z.string().optional().parse(searchText);

    const { results, total } = await gameService.list({
        page: pageNumber,
        gamesPerPage,
        searchText: search
    });

    response.status(200).json({
        results: gameTransformer.transformArray(results),
        total
    });
}));

gamesRouter.get('/:id', requestHandler(async (request: Request, response: Response) => {
    const id = z.number().parse(Number.parseInt(request.params.id));

    try {
        const game = await gameService.listGameById(id);

        response.status(200).json(gameTransformer.transform(game));
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'No such game exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error' });
    }
}));

gamesRouter.post('/', auth, requestHandler(async (request: Request, response: Response) => {
    const input = GameInputSchema.parse(request.body);
    const user = currentUser(response);

    try {
        const game = await gameService.createGame(input, user.id);

        response.status(201).json(gameTransformer.transform(game));
    } catch (error) {
        if (error instanceof UniqueViolationError) {
            response.status(400).json({ message: 'Game already exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error' });
    }
}));

gamesRouter.delete('/:id', auth, requestHandler(async (request: Request, response: Response) => {
    const id = z.number().parse(Number.parseInt(request.params.id));

    try {
        await gameService.deleteGameById(id);
        
        response.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'No such game exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

gamesRouter.put('/:id', auth, requestHandler(async (request: Request, response: Response) => {
    const gameId = z.number().parse(Number.parseInt(request.params.id));
    const minAge = z.number().parse(Number.parseInt(request.body.minAge));
    const userId = z.number().parse(Number.parseInt(request.body.userId));
    const name = z.string().parse(request.body.name);

    try {
        const updatedGame = await gameService.updateGameById(gameId, name, minAge, userId);

        response.status(200).json(gameTransformer.transform(updatedGame));
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'No such game exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

gamesRouter.patch('/:id', auth, requestHandler(async (request: Request, response: Response) => {
    const gameId = z.number().parse(Number.parseInt(request.params.id));
    const minAge = z.number().parse(Number.parseInt(request.body.minAge));

    try {
        const updatedGame = await gameService.updateGameMinAgeById(gameId, minAge);

        response.status(201).json(gameTransformer.transform(updatedGame));
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'No such game exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

export default gamesRouter;