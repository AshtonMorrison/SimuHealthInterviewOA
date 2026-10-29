import type { Request, Response } from "express";
import { todoDB } from "../local-db/todo.db";
import type { AuthRequest } from '../middleware/auth.middleware';

// Create a todo from request
export const createTodo = (req: AuthRequest, res: Response) => {

    const userId = req.user?.userId;
    if (!userId){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const { description } = req.body;

    const todo = todoDB.createTodo(userId, description);

    res.status(201).json(todo);
};

// Get all todos
export const getAllTodos = (req: Request, res: Response) => {
    const todos = todoDB.getAllTodos();

    // Begin Filtering array of Todos
    const filterCompleted = typeof req.query.completed === "string" ? req.query.completed : undefined;
    const filterDescription = typeof req.query.description === "string" ? req.query.description : undefined;

    const filteredTodos = todos.filter((todo) => {

        // Filter by completed
        if (filterCompleted && todo.completed !== (filterCompleted === "true")) { return false; }

        // Filter by description
        if (filterDescription && !todo.description.toLowerCase().includes(filterDescription.toLowerCase())) { return false; }

        return true;
    });

    if (!filteredTodos.length){
        res.json({ 
            message: "No todos available", 
        });
        return;
    }
    res.json(filteredTodos);
};

// Update a todo
export const updateTodo = (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const { id } = req.params;
    if (typeof id !== "string") {
        res.status(400).json({ message: "Invalid todo id" });
        return;
    }

    const updatedTodo = todoDB.updateTodo(id, userId, req.body);

    if (!updatedTodo) {
        res.status(404).json({ message: "No todo found with provided id under provided userId" });
        return;
    }

    res.json(updatedTodo);
};

// Delete a todo
export const deleteTodo = (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId){
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const { id } = req.params;
    if (typeof id !== "string") {
        res.status(400).json({ message: "Invalid todo id" });
        return;
    }

    const deleted = todoDB.deleteTodo(id, userId);

    if (!deleted) {
        res.status(404).json({ message: "No todo found with provided id under provided userId" });
        return;
    }

    res.json({ message: "Todo deleted successfully" });
};