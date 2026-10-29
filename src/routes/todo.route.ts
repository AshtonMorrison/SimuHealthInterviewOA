import { Router } from 'express';
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../handlers/todo.handler';
import { authTodo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validator.middleware';
import { createTodoSchema, todoQuerySchema, updateTodoSchema } from '../middleware/validation.schema';

const todoRouter = Router();

todoRouter.get('/', validateRequest(todoQuerySchema), getAllTodos);

todoRouter.post('/', authTodo, validateRequest(createTodoSchema), createTodo);
todoRouter.put('/:id', authTodo, validateRequest(updateTodoSchema), updateTodo);
todoRouter.delete('/:id', authTodo, deleteTodo);

export default todoRouter;