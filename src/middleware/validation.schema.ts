import { z } from "zod";

// Create todo schema
export const createTodoSchema = z.object({
    description: z.string().trim().min(1)
});

// Get all todos filter schema
export const todoQuerySchema = z.object({
    description: z.string().trim().min(1).optional(),
    completed: z.enum(["true", "false"]).optional() // Comes from query so treated as string
});

// Update todo schema
export const updateTodoSchema = z.object({
    description: z.string().min(1).optional(),
    completed: z.boolean().optional() // Comes from body so treated like boolean
}).strict() // Should be strict to prevent new field addition
.refine((data) => data.description !== undefined || data.completed !== undefined);
// Should reject if both fields are missing, since why are you updating with no information

// User creation and login schema / Auth schema
export const userAuthSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().trim().min(1)
});
