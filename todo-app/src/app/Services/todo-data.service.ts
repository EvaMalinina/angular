import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../Models/todo';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { IResponse } from "../Models/res.model";

@Injectable({
  providedIn: 'root'
})

export class TodoDataService {
  baseUrl = 'https://todolist-89791.firebaseio.com/todos';

  constructor(
    private http: HttpClient
  ) { }

  listTodo() {
    return this.http
      .get<Todo[]>(`${this.baseUrl}.json`)
      .pipe(map( todos => {
        if (!todos) {
          return []
        }
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

  markTodo( todo: Todo ): Observable<Todo> {
    console.log('server', todo.id)
    return this.http
      .patch<IResponse>(`${this.baseUrl}/${todo.id}/.json`, todo)
      .pipe(map(res => {
        console.log('server 2', todo)
        return todo
        // return {...todo, id: res.name}
      }))
  }

  // markTodo( todo: Todo ) {
  //   console.log('server', todo.id)
  //   return this.http
  //     .patch(`${this.baseUrl}/${todo.id}/.json`, { "isDone": ``${!todo.idDone}`` })
  //     .subscribe(
  //       (val) => {
  //         console.log("PATCH call successful value returned in body",
  //           val);
  //       },
  //       response => {
  //         console.log("PATCH call in error", response);
  //       },
  //       () => {
  //         console.log("The PATCH observable is now completed.");
  //       });
  //
  // }

  deleteTodo( todo: Todo ): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${todo.id}.json`)
  }
}
