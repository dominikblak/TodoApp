import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FirebaseService } from '../services/firebase.service';
import { TaskColor } from './task-color';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
})
export class TodoTaskComponent {
  public tasksList: Task[];

  constructor(private taskservice: TasksService, private firebaseservice: FirebaseService) {
    this.taskservice.getTaskListObs().subscribe((tasks: Task[]) => {
      this.tasksList = tasks.filter((t) => t.isDone === false);
    });
    this.firebaseservice.getTasks().subscribe((tasks: Task[]) => {
      this.tasksList = tasks.filter((t) => t.isDone === false);
    });
  }

  public removeTask(task: Task): void {
    this.firebaseservice.removeTask(task);
  }
  public done(task: Task): void {
    this.taskservice.done(task);
  }

  public getColor(): string {
    return this.tasksList.length >= 5 ? TaskColor.red : TaskColor.green;
  }

  public addTask(task: Task): void {
    this.firebaseservice.addTask(task);
  }
  public addTasks(): void {
    this.tasksList.forEach((task: Task) => {
      this.addTask(task);
    });
  }
}
