import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  
  // getTasks(){
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.user.subscribe(currentUser => {
  //       if(currentUser){
  //         this.snapshotChangesSubscription = this.firestore.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
  //         resolve(this.snapshotChangesSubscription);
  //       }
  //     })
  //   })
  // }

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/events/`).update({
        title: value.title,
        description: value.description,
        image: value.image,
        status: "pending",
        reminderdate: value.reminderdate,
        repeat: value.repeat,
        remindmetime: value.remindmetime
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  }
