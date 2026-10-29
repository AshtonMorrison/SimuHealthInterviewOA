import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { userId: string };
}

export function authTodo(req: AuthRequest, res: Response, next: NextFunction) {

    const jwtToken = req.headers.authorization;
    if (!jwtToken){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "secret");

        if (typeof decoded === "string" || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = { userId: decoded.userId };
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}