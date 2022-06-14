import { Request, Response, Router } from "express";
import { UniqueViolationError } from "objection";
import { z } from "zod";
import { requestHandler } from "../lib/request-handler";
import auth from "../middlewares/auth-middleware";
import CategoryService, { CategoryNotFoundError } from "../services/category-service";
import { GameNotFoundError } from "../services/game-service";
import { CategoryTransformer } from "../transformers/category-transformer";

const categoriesRouter = Router();
const categoryTransformer = new CategoryTransformer();

categoriesRouter.get('/', requestHandler(async (request: Request, response: Response) => {
    const categories = await CategoryService.listAll();

    if (categories.length === 0) {
        response.status(404).json({ message: 'No categories found.' });
        return;
    }

    response.status(200).json(categoryTransformer.transformArray(categories));
}));

categoriesRouter.post('/', auth, requestHandler(async (request: Request, response: Response) => {
    try {
        const name = z.string().parse(request.body.name);

        const category = await CategoryService.addCategory(name);

        response.status(201).json(categoryTransformer.transform(category));
    } catch (error) {
        if (error instanceof UniqueViolationError) {
            response.status(400).json({ message: 'Category already exists.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

categoriesRouter.post('/:categoryId', auth, requestHandler(async (request: Request, response: Response) => {
    try {
        const categoryId = z.number().parse(Number.parseInt(request.params.categoryId));
        const gameId = z.number().parse(Number.parseInt(request.body.gameId));

        await CategoryService.addGameToCategory(gameId, categoryId);

        response.status(201).json({ message: 'Added game to category successfully.' });
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'Game not found.' });
            return;
        } else if (error instanceof CategoryNotFoundError) {
            response.status(404).json({ message: 'Category not found.' });
            return;
        } else if (error instanceof UniqueViolationError) {
            response.status(400).json({ message: 'Category already contains this game.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

categoriesRouter.delete('/', auth, requestHandler(async (request: Request, response: Response) => {
    const gameId = z.number().parse(Number.parseInt(request.body.gameId));
    const categoryId = z.number().parse(Number.parseInt(request.body.categoryId));

    try {
        await CategoryService.removeGameFromCategory(gameId, categoryId);

        response.status(200).json({ message: 'Game removed from category.' });
    } catch (error) {
        if (error instanceof GameNotFoundError) {
            response.status(404).json({ message: 'Game not found.' });
            return;
        } else if (error instanceof CategoryNotFoundError) {
            response.status(404).json({ message: 'Category not found.' });
            return;
        }

        response.status(500).json({ message: 'Internal server error.' });
    }
}));

export default categoriesRouter;