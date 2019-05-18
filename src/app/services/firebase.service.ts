import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from '../models/task';
@Injectable(
  {providedIn: 'root'}
)
export class FirebaseService {
  private tasks: Observable<Task[]>;
  constructor( private db: AngularFireDatabase) {
    // Use snapshotChanges().map() to store the key
    this.tasks = db.list('tasks').snapshotChanges()
    .pipe( tap( (a: any)=>  {
      console.log(a);
    }))
    // .pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );

  }

  public getTasks(): Observable<Task[]> {

    return this.tasks;
  }

  public addTask( task:Task): void {
    this.db.list('tasks').push(task);
  }
}
