import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  readonly URL_DB = 'https://todo-1ea4e.firebaseio.com';
  readonly param = new HttpParams().set('apiKey', 'AIzaSyASPJ3vCbOdlCiRRg7Yc0J1mGbCs17gcMY');


  constructor(private http: HttpClient) {
    this.getTasks();
  }


  getTasks(): Observable<Array<Task>> {
   return this.http.get<Array<Task>>(this.URL_DB, { params: this.param });
  }

  saveTasks(list: Array<Task>) {
    this.http.put(this.URL_DB, list, { params: this.param }).subscribe(data => {
      console.log(data);
    });
  }
}
