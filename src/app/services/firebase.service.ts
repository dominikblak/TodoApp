import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  public taskRef: AngularFireList<any>;
  private tasks: Observable<Task[]>;
  constructor(private db: AngularFireDatabase) {
    // Use snapshotChanges().map() to store the key
    this.taskRef = db.list('tasks');
    this.tasks = this.taskRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          key: c.payload.key,
          created: c.payload.val().created,
          isDone: c.payload.val().isDone,
          name: c.payload.val().name,
          userId: c.payload.val().userId,
        })),
      ),
    );
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  public addTask(task: Task): void {
    this.db.list('tasks').push(task);
  }
}
