export interface ITodo {
  id: string;
  text: string;
}

export class Todo implements ITodo {
  constructor(public id: string, public text: string) {}
}
export type TTodoList = Todo[];

export interface IToDoBody {
  text: string;
}

export class TodosDB {
  get todolist() {
    return this._todoList;
  }
  set todolist(newTodoList) {
    this._todoList = newTodoList;
  }
  constructor(protected _todoList: TTodoList) {}
}

export interface ITodoParams {
  id: string;
}
