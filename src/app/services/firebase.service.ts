import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
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
      map((changes: SnapshotAction<Task>[]) =>
        changes.map(({ payload }) => ({
          key: payload.key,
          created: payload.val().created,
          isDone: payload.val().isDone,
          name: payload.val().name,
          userId: payload.val().userId,
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
  public removeTask({ key }: Task): void {
    console.log(key);
    this.taskRef.remove(key);
    // from(this.taskRef.remove());
  }
}
