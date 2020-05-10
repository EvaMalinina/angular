import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ITodo } from "../Models/todo.model";
import { TodoDataService } from "../Services/todo-data.service";
import { Todo } from "../Models/todo";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

import {trigger, keyframes, animate, transition} from "@angular/animations";
import * as keyfr from '../keyframes/keyframes';
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@AutoUnsubscribe()
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ TodoDataService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  animations: [
    trigger( 'noteAnimation', [
      transition('* => swipeLeft', animate(700, keyframes(keyfr.swipeLeft))),
      transition('* => swipeRight', animate(700, keyframes(keyfr.swipeRight))),
    ])
  ]
})

export class TodoListComponent implements OnInit {

  todos: ITodo[];
  todo: ITodo = new Todo(  "", "", false, '');
  form: FormGroup
  list: FormGroup
  searchInput: string
  step = 0
  animationState: string

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit(): void {
    this.createForm()
    this.listTodo()
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      deadline: new FormControl(  '', Validators.required)
    })
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

  addTodo() {
    let { title, deadline } = this.form.value;
    deadline = moment(deadline).format('DD.MM.YYYY');
    const  todo: ITodo = {
      id: Date.now() + '',
      title,
      isDone: false,
      deadline
    }
    this.todoDataService.addTodo(todo).subscribe( todo => {
      this.todos.push(todo);
      this.form.reset()
    }, err => console.error(err))
  }

  setStep(index: number) {
    this.step = index;
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

  sortByDeadline() {
    this.todos.sort((a, b) => {
      if (a.deadline < b.deadline) return -1;
    })
  }

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }

  ngOnDestroy() {}
}
