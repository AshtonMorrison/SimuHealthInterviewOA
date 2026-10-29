import type { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { userDB } from "../local-db/user.db";

// Create User Handler
export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const existingUser = userDB.getUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({
            message: "Username already exists" 
        });
    }
    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = userDB.createUser(username, hashedPass);

    res.status(201).json({ newUser });
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = userDB.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const jwtToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
    );

    return res.json({ token: jwtToken });
}