import { Router } from 'express';
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../handlers/todo.handler';

const todoRouter = Router();

todoRouter.get('/', getAllTodos);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodo);

export default todoRouter;