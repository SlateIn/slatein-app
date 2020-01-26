import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private firedata = firebase.database().ref('/users/');
  private currentUserUID$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private afAuth: AngularFireAuth) { 
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUserUID$.next(user.uid);
      } 
    });
  }

  get currentUserUID() {
    return this.currentUserUID$.asObservable();
  }

  signInWithEmail(email: string, pwd: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
  }

  signUp(newUser, profilePic) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
      if (profilePic) {
        return firebase.storage().ref(`images/${this.afAuth.auth.currentUser.uid}.jpg`).put(profilePic).then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((profilePicUrl) => {
            return this.updateUserInfo(newUser, profilePicUrl);
          });
        });
      } else {
        return this.updateUserInfo(newUser);
      }

    });
  }

  private updateUserInfo(newUser, profilePicUrl?) {
    return this.firedata.child(`${this.afAuth.auth.currentUser.uid}`).update({
      fname: newUser.fname,
      lname: newUser.lname,
      email: newUser.email,
      gender: newUser.gender,
      birthdate: newUser.birthdate,
      'photoURL': profilePicUrl ? profilePicUrl : ''
    });
  }

  passwordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    return firebase.auth().signOut();
  }

  updatePhotoUrl(profilePic) {
    if(profilePic) {
      firebase.storage().ref(`images/${this.afAuth.auth.currentUser.uid}.jpg`).put(profilePic).then((snapshot) => {
        {
          snapshot.ref.getDownloadURL().then((profilePicUrl) => {
            this.firedata.child(`${this.afAuth.auth.currentUser.uid}`).update({
              'photoURL': profilePicUrl ? profilePicUrl : ''
            })
          })
        }
      });
    }
  
  }

  updatePwd(newPwd: string) {
    return firebase.auth().currentUser.updatePassword(newPwd);
  }
}

