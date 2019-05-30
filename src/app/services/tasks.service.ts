import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksService {
  private taskListObs = new BehaviorSubject<Task[]>([]);

  constructor() {}

  add(task: Task[]) {
    const list = this.taskListObs.getValue().concat(task);
    this.taskListObs.next(list);
  }

  remove(task: Task) {
    const list = this.taskListObs.getValue().filter((e) => e !== task);
    this.taskListObs.next(list);
  }

  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.taskListObs.getValue();
    this.taskListObs.next(list);
  }
  getTaskListObs(): Observable<Task[]> {
    return this.taskListObs.asObservable();
  }

  getDoneTaskListObs(): Observable<Task[]> {
    return this.getTaskListObs().pipe(map((tasks: Task[]) => tasks.filter((t) => t.isDone === true)));
  }
}
