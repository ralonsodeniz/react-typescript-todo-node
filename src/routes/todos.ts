import { Router } from 'express';
import {
  createTodo,
  getTodos,
  updateTodos,
  deleteTodo,
} from '../handlers/todos';
// this will function as a middleware that gets a parent route and attaches the routes defined here and the handlers
const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodos);
router.delete('/:id', deleteTodo);

export default router;
