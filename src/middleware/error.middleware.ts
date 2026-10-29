import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

// Error middleware to handle errors in Zod, JSON parsing, and unexpected errors
export const errorMiddleware = 
(err: unknown, req: Request, res: Response, next: NextFunction) => {

    // Zod Error handling
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation of Request failed",
            errors: err.message,
        });
    }

    // JSON parsing error handling
    const parserError = err as { type?: string };
    if (parserError.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Invalid JSON" 
        });
    }

    // If not Zod or JSON, must be an unexpected error
    return res.status(500).json({
        message: "Unexpected Server Error",
    });
}