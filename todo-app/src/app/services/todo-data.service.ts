import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../Models/todo';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import { IResponse } from "../Models/res.model";

@Injectable({
  providedIn: 'root'
})

export class TodoDataService {
  // todoList: AngularFireList<any>;
  baseUrl = 'https://todolist-89791.firebaseio.com/todos';

  // TODO = 'todos'
  constructor(
    private http: HttpClient
  ) { }

  listTodo() {
    return this.http
      .get<Todo[]>(`${this.baseUrl}.json`)
      .pipe(map( todos => {
        if (!todos) {
          console.log('no todos')
          return []
        }
      // return Object.keys(todos).map(key => ({ ...todos[key], id: key}))
      // todos = [];
      //   Object.keys(todos).forEach(function(prop) {
      //     let inner = todos[prop]
      //     let val = Object.values(inner)[0]
      //
      //     todos.push(val)
      //   })
        console.log('todos yes', todos)
        return todos;
      }))
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<IResponse>(`${this.baseUrl}/${todo.id}.json`, todo)
      .pipe(map(res => {
        return {...todo, id: res.name}
      }))
  }

  // markTodo(todo: Todo) {
  //   return this.http.patch(this.todoList + this.TODO + '/' + todo.id, todo);
  // }
  // getPing() {
  //   return this.http.get<string>(this.baseUrl + 'ping')
  // }

  // addTodo(todo: Todo) {
  //   return this.http.post(this.baseUrl + this.TODO, todo);
  // }

  // listTodo() {
  //   return this.http.get(this.baseUrl + this.TODO);
  // }
  //
  // markTodo(todo: Todo) {
  //   return this.http.patch(this.baseUrl + this.TODO + '/' + todo.id, todo);
  // }
}
