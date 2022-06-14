import { Request, Response, Router } from "express";
import { z } from "zod";
import { requestHandler } from "../lib/request-handler";
import { CategoryNotFoundError } from "../services/category-service";
import { gameCategoryService } from "../services/game-category-service";
import { GameNotFoundError } from "../services/game-service";
import { GameCategoryTransformer } from "../transformers/game-category-transformer";
import auth from "../middlewares/auth-middleware";

const gameCategoriesRouter = Router();
const gameCategoryTransformer = new GameCategoryTransformer();

gameCategoriesRouter.get('/games/:id',
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const gameId = z.number().positive().parse(Number(request.params.id));

        try {
            const categories = await gameCategoryService.getCategoriesByGameId(gameId);
            
            response.status(200).json(gameCategoryTransformer.transformArray(categories));
        } catch (error) {
            if (error instanceof GameNotFoundError) {
                response.status(404).json({ message: 'No such game exists.' });
                return;
            }
    
            response.status(500).json({ message: 'Internal server error.' });
        }
    })
);

gameCategoriesRouter.get('/categories/:id', 
    auth,
    requestHandler(async (request: Request, response: Response) => {
        const categoryId = z.number().positive().parse(Number(request.params.id));

        try {
            const games = await gameCategoryService.getGamesByCategoryId(categoryId);

            response.status(200).json(gameCategoryTransformer.transformArray(games));
        } catch (error) {
            if (error instanceof CategoryNotFoundError) {
                response.status(404).json({ message: 'No such category exists.' });
                return;
            }
    
            response.status(500).json({ message: 'Internal server error.' });
        }
    })
);

export default gameCategoriesRouter;