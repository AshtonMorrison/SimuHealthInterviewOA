import { Router } from 'express';
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../handlers/todo.handler';
import { authTodo } from '../middleware/auth.middleware';

const todoRouter = Router();

todoRouter.get('/', getAllTodos);

todoRouter.post('/', authTodo, createTodo);
todoRouter.put('/:id', authTodo, updateTodo);
todoRouter.delete('/:id', authTodo, deleteTodo);

export default todoRouter;