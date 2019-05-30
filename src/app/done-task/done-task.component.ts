import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent {
  public tasksDone: Observable<Task[]>;
  constructor(private taskservice: TasksService) {
    this.tasksDone = this.taskservice.getDoneTaskListObs();
  }
}
