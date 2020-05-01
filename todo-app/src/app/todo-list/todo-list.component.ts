import { Component, OnInit } from '@angular/core';
import { ITodo } from "../Models/todo.model";
import { TodoDataService } from "../services/todo-data.service";
import { Todo } from "../Models/todo";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
      console.log('new task', todo)
      this.form.reset()
    }, err => console.error(err))
  }

  // ngOnInit() {
  //   // this.todoDataService.getTodoList().snapshotChanges().subscribe(
  //   //   item => {
  //   //     this.todos = [];
  //   //     item.forEach( el => {
  //   //       let note = el.payload.toJSON();
  //   //       note['key'] = el.key;
  //   //       console.log(note)
  //   //       this.todos.push(note)
  //   //     })
  //   //     //
  //   //     // this.todos.sort( ( a: Todo, b: Todo ) => {
  //   //     //   return a.isDone? - b.isDone?;
  //   //     // })
  //   //   })
  //   // this.listTodo();
  //
  // }

  // addTodo(todo: Todo) {
  //   this.todoDataService.addTodo(todo);
  // }

  // addTodo(todo: Todo) {
  //   this.todoDataService.addTodo(this.todo).subscribe((todo)=>{
  //     this.todos.push(todo);
  //   });
  // }

  listTodo() {
    this.todoDataService.listTodo().subscribe((todos: ITodo[])=>{
      this.todos = todos;
    });
  }
  //
  // mark(todo: Todo) {
  //   todo.isDone = !todo.isDone;
  //   this.todoDataService.markTodo(todo).subscribe((data)=>{
  //     let index = this.todos.indexOf(todo);
  //     this.todos[index] = todo;
  //   });
  // }
}
