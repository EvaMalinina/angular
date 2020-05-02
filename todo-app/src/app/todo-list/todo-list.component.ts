import { Component, OnInit } from '@angular/core';
import { ITodo } from "../Models/todo.model";
import { TodoDataService } from "../Services/todo-data.service";
import { Todo } from "../Models/todo";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import { SearchPipe } from '../Pipe/searchPipe.components';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [ TodoDataService ]
})

export class TodoListComponent implements OnInit {

  todos: ITodo[];
  todo: ITodo = new Todo( Date.now()+ '',"",false);
  form: FormGroup

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
    this.listTodo()
  }

  addTodo() {
    const { title } = this.form.value;

    const  todo: ITodo = {
      id: Date.now() + '',
      title,
      isDone: false
    }

    this.todoDataService.addTodo(todo).subscribe( todo => {
      this.todos.push(todo);
      this.form.reset()
    }, err => console.error(err))
  }

  listTodo() {
    this.todoDataService.listTodo().subscribe((data: ITodo[])=>{

      let list = [];
      Object.keys(data).forEach(function(prop) {
        let inner = data[prop]
        let val = Object.values(inner)[0]
        list.push(val)
      })
      this.todos = list;
    });
  }

  mark( todo: Todo ) {
    todo.isDone = !todo.isDone;
    this.todoDataService.markTodo(todo).subscribe((data)=>{
      return todo;
    });
  }

  delete( todo: Todo ) {
    this.todoDataService
      .deleteTodo(todo)
      .subscribe(()=>{
        this.todos = this.todos.filter(otherTodo => otherTodo.id !== todo.id)
    }, err => console.error(err))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  sortAll() {
    this.listTodo();
  }

  sortDone() {
    this.todos = this.todos.filter(todo => todo.isDone !== false )
  }

  sortInProgress() {
    this.todos = this.todos.filter(todo => todo.isDone !== true )
  }
}
