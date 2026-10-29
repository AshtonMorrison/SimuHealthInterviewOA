import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {

    // Validate query params if GET request, else validate body
    const requestToValidate = req.method === "GET" ? req.query : req.body;

    // Express 5 auto routes to errorMiddleware if Zod error is thrown
    schema.parse(requestToValidate);
    next()
}