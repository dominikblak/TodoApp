import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent {
  public tasksDone: Task[];
  constructor(private taskservice: TasksService) {
    this.taskservice.getTaskListObs().subscribe((tasks: Task[]) => {
      this.tasksDone = tasks.filter((t) => t.isDone === true);
    });
  }
}
