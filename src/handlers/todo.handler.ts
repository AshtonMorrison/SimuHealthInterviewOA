import type { Request, Response } from "express";
import { todoDB } from "../local-db/todo.db";

// Create a todo from request
export const createTodo = (req: Request, res: Response) => {
    const { description } = req.body;

    // set owner to User1 for now
    const todo = todoDB.createTodo("user1", description);

    res.status(201).json(todo);
};

// Get all todos
export const getAllTodos = (req: Request, res: Response) => {
    const todos = todoDB.getAllTodos();
    if (!todos.length){
        res.json({ 
            message: "No todos available", 
        });
        return;
    }
    res.json(todos);
};

// Update a todo
export const updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        res.status(400).json({ message: "Invalid todo id" });
        return;
    }

    const updatedTodo = todoDB.updateTodo(id, req.body);

    if (!updatedTodo) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }

    res.json(updatedTodo);
};

// Delete a todo
export const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        res.status(400).json({ message: "Invalid todo id" });
        return;
    }

    const deleted = todoDB.deleteTodo(id);

    if (!deleted) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }

    res.json({
        message: "Todo deleted successfully",
    });
};