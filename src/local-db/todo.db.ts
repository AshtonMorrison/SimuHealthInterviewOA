import type { Todo } from '../models/todo.model';

class TodoDB {
    private todoMap = new Map<string, Todo>();

    // Create todo task with unique id
    createTodo(owner: string, description: string): Todo {
        const todoTask: Todo = {
            id: crypto.randomUUID(),
            owner,
            description,
            completed: false,
        };
        this.todoMap.set(todoTask.id, todoTask);
        return todoTask;
    }

    // Get all todos
    getAllTodos(): Todo[] {
        return Array.from(this.todoMap.values());
    }

    // Update todo
    updateTodo(id: string, owner: string, updatedInfo: Partial<Todo>): Todo | null {
        const existingTodo = this.todoMap.get(id);
        if (!existingTodo) {
            return null;
        }
        if (existingTodo.owner !== owner) {
            return null;
        }

        const updatedTodo: Todo = {...existingTodo, ...updatedInfo};

        this.todoMap.set(id, updatedTodo);
        return updatedTodo;
    }

    // Delete todo
    deleteTodo(id: string, owner: string): boolean {
        const existingTodo = this.todoMap.get(id);
        if (!existingTodo || existingTodo.owner !== owner) {
            return false;
        }
        return this.todoMap.delete(id);
    }
}

export const todoDB = new TodoDB();