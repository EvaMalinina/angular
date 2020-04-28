import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo";
import {TodoDataService} from "../todo-data.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  todo: Todo = {
    id: Date.now(),
    title: "",
    isDone: false
  };

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit() {
    this.listTodo();
  }

  addTodo() {
    this.todoDataService.addTodo(this.todo).subscribe((data)=>{
      this.todos.push(data);
    });
  }

  listTodo() {
    this.todoDataService.listTodo().subscribe((data: Todo[])=>{
      this.todos = data;
    });
  }

  mark(todo) {
    todo.isDone = !todo.isDone;
    this.todoDataService.markTodo(todo).subscribe((data)=>{
      let index = this.todos.indexOf(todo);
      this.todos[index] = todo;
    });
  }

}
