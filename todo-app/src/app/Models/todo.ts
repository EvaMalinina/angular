import {ITodo} from "./todo.model";

export class Todo implements ITodo {
  public id?: string;
  public title?: string;
  public isDone?: boolean;

  constructor(id: string, title: string, isDone: boolean) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
  }
}
