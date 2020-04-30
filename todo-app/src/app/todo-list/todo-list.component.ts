import { Component, OnInit } from '@angular/core';
import { ITodo } from "../Models/todo.model";
import { TodoDataService } from "../services/todo-data.service";
import { Todo } from "../Models/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {

  todos: ITodo[];
  todo: ITodo = new Todo( Date.now(),"",false);

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
    this.todoDataService.listTodo().subscribe((data: ITodo[])=>{
      this.todos = data;
    });
  }

  mark(todo: Todo) {
    todo.isDone = !todo.isDone;
    this.todoDataService.markTodo(todo).subscribe((data)=>{
      let index = this.todos.indexOf(todo);
      this.todos[index] = todo;
    });
  }
}
