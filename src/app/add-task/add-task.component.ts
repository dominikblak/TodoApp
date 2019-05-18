import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  public addForm: FormGroup;

  constructor(private taskservice: TasksService, private authService: AuthService) {}

  public ngOnInit(): void {
    this.addForm = this.initForm();
  }

  public initForm(): FormGroup {
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)]),
    });
  }
  public add(): void {
    const taskList = this.createTaskList();
    this.taskservice.add(taskList);
    this.addForm = this.initForm();
  }

  public createTaskList(): Task[] {
    const TaskArr = <[string]>this.addForm.get('taskName').value;
    const taskList = TaskArr.map((taskName) => {
      return { userId: this.authService.user.uid, name: taskName, created: new Date().toLocaleString(), isDone: false };
    });
    return taskList;
  }

  public addField(): void {
    const arr = <FormArray>this.addForm.get('taskName');
    arr.push(new FormControl(null, Validators.required));
  }
}
