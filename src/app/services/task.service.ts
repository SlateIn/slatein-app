import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { TaskReminderInfo } from '@models/taskDetails';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserInfo } from '@models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private snapshotChangesSubscription: any;
  taskInfo$: Observable<TaskReminderInfo>;

  constructor( private auth: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
   
  get getTask(){
    return this.afAuth.authState.pipe(
      map(auth => auth.uid),
      switchMap(res => this.db.list<TaskReminderInfo>(`/users/${res}/events/`).valueChanges()));
   }
   
  createTask(taskInfo: TaskReminderInfo, id){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      let taskInfoData = {
          title: taskInfo.title,
          description: taskInfo.description,
          image: taskInfo.image,
          status: "pending",
          reminderdate: taskInfo.reminderdate.toString(),
          repeat: taskInfo.repeat,
          //remindmetime: taskInfo.remindmetime
          }
      return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/events/${id}`).set(taskInfoData)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  }
