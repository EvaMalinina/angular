import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService {

  baseUrl = 'https://jsonplaceholder.typicode.com/';
  TODO = 'todos'
  constructor(
    private http: HttpClient
  ) { }

  getPing() {
    return this.http.get<string>(this.baseUrl + 'ping')
  }

  addTodo(todo: Todo) {
    return this.http.post(this.baseUrl + this.TODO, todo);
  }

  listTodo() {
    return this.http.get(this.baseUrl + this.TODO);
  }

  markTodo(todo: Todo) {
    return this.http.patch(this.baseUrl + this.TODO + '/' + todo.id, todo);
  }
}
