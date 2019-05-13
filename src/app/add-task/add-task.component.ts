import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addForm: FormGroup;

  constructor(private taskservice: TasksService, private authService: AuthService) {

  }

  ngOnInit() {
    this.addForm = this.initForm();
  }

    initForm() {
      return new FormGroup({
        taskName: new FormArray([new FormControl(null, Validators.required)])
      });
    }
  add() {
    const taskList = this.createTaskList();
    this.taskservice.add(taskList);
    this.addForm = this.initForm();

  }

  createTaskList(): Array<Task> {
    const taskList = new Array<Task>();
    const TaskArr = <[string]>this.addForm.get('taskName').value;
    TaskArr.forEach(taskName => {
      const task = { userId: this.authService.user.uid, name: taskName, created: new Date().toLocaleString(), isDone: false };
      taskList.push(task);
    });
    return taskList;
  }
  addField() {
    const arr = <FormArray>this.addForm.get('taskName');
    arr.push(new FormControl(null, Validators.required));
  }
}
