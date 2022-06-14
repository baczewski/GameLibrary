import { Request, Response, Router } from "express";
import { UniqueViolationError } from "objection";
import { z } from "zod";
import { requestHandler } from "../lib/request-handler";
import auth from "../middlewares/auth-middleware";
import RankingService, { RankingNotFoundError } from "../services/ranking-service";
import { RankingTransformer } from "../transformers/ranking-transformer";

const rankingsRouter = Router();
const rankingTransformer = new RankingTransformer();

rankingsRouter.get('/', requestHandler(async (request: Request, response: Response) => {
    const rankings = await RankingService.listAll();

    if (rankings.length === 0) {
        response.status(400).json({ message: 'No rankings were found.' });
        return;
    }

    response.status(200).json(rankingTransformer.transformArray(rankings));
}));

rankingsRouter.post('/', auth, requestHandler(async (request: Request, response: Response) => {
    const name = z.string().parse(request.body.name);

    try {
        const ranking = await RankingService.addRanking(name);

        response.status(201).json(rankingTransformer.transform(ranking));
    } catch (error) {
        if (error instanceof UniqueViolationError) {
            response.status(400).json({ message: 'Ranking already exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

rankingsRouter.delete('/:rankingId', auth, requestHandler(async (request: Request, response: Response) => {
    const rankingId = z.number().parse(Number.parseInt(request.params.rankingId));

    try {
        await RankingService.deleteRankingById(rankingId);

        response.status(200).json({ message: 'Deleted ranking successfully.' });
    } catch (error) {
        if (error instanceof RankingNotFoundError) {
            response.status(404).json({ message: 'No such ranking exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

export default rankingsRouter;