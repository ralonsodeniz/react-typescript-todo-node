import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IToDoBody, ITodo, ITodoParams, Todo } from '../models/todo';
import TODOS from '../database/todos';
// another way to define the types is to tell typescript that this function is going to be a request handler
export const createTodo: RequestHandler = (req, res) => {
  const { text } = <IToDoBody>req.body; // this is the same as req?.body as ICreateToDoBody
  const todoList = TODOS.todolist;
  const newTodo = new Todo(uuidv4(), text);
  TODOS.todolist = [...todoList, newTodo];
  res.status(201).json({ message: 'New todo created successfully', newTodo });
};

export const getTodos: RequestHandler = (_, res) =>
  res.status(200).json({ todosList: TODOS.todolist });

export const updateTodos: RequestHandler<ITodoParams> = (req, res) => {
  // we can pass the handler the type of the params using the generic type as shown
  const { text } = <IToDoBody>req.body;
  const { id } = req.params;
  if (TODOS.todolist.some(todo => todo.id === id)) {
    TODOS.todolist = TODOS.todolist.reduce(
      (accumulator, todo) =>
        todo.id !== id
          ? [...accumulator, todo]
          : [...accumulator, new Todo(id, text)],
      [] as ITodo[],
    );
    res.status(201).json({ message: `todo id:${id} updated` });
  } else throw new Error(`no todo with id:${id}`); // this error will be catch by our error handler
};

export const deleteTodo: RequestHandler<ITodoParams> = (req, res) => {
  const { id } = req.params;
  if (TODOS.todolist.some(todo => todo.id === id)) {
    TODOS.todolist = TODOS.todolist.filter(todo => todo.id !== id);
    res.status(201).json({ message: `todo id:${id} removed` });
  } else throw new Error(`no todo with id:${id}`);
};
