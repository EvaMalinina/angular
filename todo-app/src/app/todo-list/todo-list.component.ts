import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ITodo } from "../Models/todo.model";
import { TodoDataService } from "../Services/todo-data.service";
import { Todo } from "../Models/todo";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [ TodoDataService ],
  encapsulation: ViewEncapsulation.None
})

export class TodoListComponent implements OnInit {

  todos: ITodo[];
  todo: ITodo = new Todo(  "", "", false);
  form: FormGroup
  list: FormGroup
  searchInput: string

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
        let val = data[prop]
        list.push(val)
      })
      this.todos = list;
    });
  }

  sortByDone() {
    this.todos.sort((a, b) => {
      return <any>a.isDone - <any>b.isDone
    })
  }

  mark( todo: Todo ) {
    todo.isDone = !todo.isDone;
    this.todoDataService.markTodo(todo).subscribe((data)=>{
      this.sortByDone();
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

  sortDone() {
    this.todoDataService.listTodo().subscribe((data: ITodo[])=>{
      let list = [];
      Object.keys(data).forEach(function(prop) {
        let val = data[prop]
        if ( val.isDone) {
          list.push(val)
        }
      })
      this.todos = list;
    });
  }

  sortInProgress() {
    this.todoDataService.listTodo().subscribe((data: ITodo[])=>{
      let list = [];
      Object.keys(data).forEach(function(prop) {
        let val = data[prop]
        if ( !val.isDone) {
          list.push(val)
        }
      })
      this.todos = list;
    });
  }

  sortByAlphabet() {
    this.todos.sort((a, b) => {
      if (a.title < b.title) return -1;
      else if (a.title > b.title) return 1;
      else return 0;
    });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
