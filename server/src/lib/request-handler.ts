import { Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";

export function requestHandler<T>(
    executeHandler: (request: Request<T>, response: Response) => Promise<void>
): RequestHandler<T> {
    return async (request, response) => {
        try {
            await executeHandler(request, response);
            
        } catch (error) {
            if (error instanceof ZodError) {
                response.status(400).json(error.flatten());
                return;
            }

            response.status(500).json({ message: 'Internal server error.' });
        }
    }
}