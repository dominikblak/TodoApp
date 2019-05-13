import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';


@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],

})
export class TodoTaskComponent implements OnInit {


  tasksList: Array<Task> = [];



  constructor(private taskservice: TasksService) {
    this.taskservice.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks.filter(t => t.isDone === false);
    });
  }

  ngOnInit() {
  }

  remove(task: Task) {
    this.taskservice.remove(task);

  }
  done(task: Task) {
    this.taskservice.done(task);

  }
  getColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green';
  }
  // save () {
  //   this.taskservice.saveTasksInDb();
  // }

}
