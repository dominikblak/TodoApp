import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';



@Injectable()
export class TasksService {



  private taskListObs = new BehaviorSubject<Array<Task>>([]);

  constructor() {

  }

  add(task: Array<Task>) {
    const list = this.taskListObs.getValue().concat(task);
    this.taskListObs.next(list);

  }

  remove(task: Task) {

    const list = this.taskListObs.getValue().filter(e => e !== task);
    this.taskListObs.next(list);
  }

  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.taskListObs.getValue();
    this.taskListObs.next(list);

  }
  getTaskListObs(): Observable<Array<Task>> {
    return this.taskListObs.asObservable();
  }
}
