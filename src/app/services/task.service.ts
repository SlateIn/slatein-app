import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { TaskReminderInfo } from '@models/taskDetails';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskInfo$: Observable<TaskReminderInfo>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  get getDailyTask(): Observable<TaskReminderInfo[]> {
    const todaysDate = new Date();
    const path = `${todaysDate.getFullYear()}/${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
    return this.afAuth.authState.pipe(
      map(auth => auth.uid),
      switchMap(res => this.db.list<TaskReminderInfo>(`/users/${res}/events/${path}/tasks`).valueChanges()));
  }

  createTask(taskInfo: TaskReminderInfo) {
    return new Promise<any>((resolve, reject) => {
      return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/events/${taskInfo.path}/tasks/${taskInfo.id}`).set(taskInfo)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  deleteTask(path: string, id: number): Promise<void> {
    return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/events/${path}/tasks/${id}`).remove();
  }

}
