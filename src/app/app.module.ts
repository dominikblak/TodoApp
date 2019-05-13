import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { TasksService } from './services/tasks.service';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';
import { TransformsTaskPipe } from './shared/transforms-task.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SortNamePipe } from './shared/sort-name.pipe';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/';


 // Initialize Firebase
 const config = {
  apiKey: 'AIzaSyDouzW15YBNyAf999KKLAgUZEl3UhDR2ao',
  authDomain: 'todo-a3c08.firebaseapp.com',
  databaseURL: 'https://todo-a3c08.firebaseio.com',
  projectId: 'todo-a3c08',
  storageBucket: 'todo-a3c08.appspot.com',
  messagingSenderId: '105684467946',
  appId: '1:105684467946:web:3da9a8aefb02e583'
};


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformsTaskPipe,
    SortNamePipe,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [TasksService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
