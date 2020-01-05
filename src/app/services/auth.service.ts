import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  firedata = firebase.database().ref('/users/');
  profilePic: string;

  constructor(private afAuth: AngularFireAuth) { }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  signUp(newUser, profilePic) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
      if(profilePic) {
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
    firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    return firebase.auth().signOut();
  }



}
