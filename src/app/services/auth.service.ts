import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AlertController, NavController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firedata = firebase.database().ref('/users/');
  private userLoggedIn = new Subject<boolean>();
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  user: User;
  userInfo;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private idle: Idle,
    private ngZone: NgZone,
    private alertController: AlertController,
    private keepalive: Keepalive,
    private navCtrl: NavController,
    private userService: UserService
  ) {
    this.userLoggedIn.next(false);
  }

  signInWithEmail(email: string, pwd: string) {
    this.setUserLoggedIn(true);
    return this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  async logInWithGoogle() {
    return await this.AuthLogin(new auth.GoogleAuthProvider());
  }
  async logInWithFacebook() {
    return await this.AuthLogin(new auth.FacebookAuthProvider());
  }
  getProviderUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        const userInfo = JSON.parse(JSON.stringify(this.user));
        const uname = userInfo.displayName.split(' ');
        const newUser = {
          fname: uname[0],
          lname: uname[1],
          email: userInfo.email,
          gender: '',
          birthdate: '',
          photoURL: '',
          provider: userInfo.providerData[0].providerId
        };
        this.userService.info.subscribe( userDetails => {
          this.userInfo = userDetails;
          if (this.userInfo === null) {
            this.updateUserInfo(newUser, '');
            this.initdata();
          }
          });
      }
    });
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.getProviderUser();
      console.log(`You have been successfully logged in!`);
    }).catch((error) => {
        console.log(error);
    });
  }
  signUp(newUser, profilePic?) {
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {
      if (profilePic) {
        return firebase
          .storage()
          .ref(`images/${this.afAuth.auth.currentUser.uid}.jpg`)
          .putString(profilePic, 'base64')
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL().then((profilePicUrl) => {
              return Promise.all([this.updateUserInfo(newUser, profilePicUrl), this.initdata()]);
            });
          });
      } else {
        return Promise.all([this.updateUserInfo(newUser), this.initdata()]);
      }
    });
  }

  private initdata() {
    return this.firedata.child(`${this.afAuth.auth.currentUser.uid}`).update({
      scheduleCounter: 0
    });
  }

  private updateUserInfo(newUser, profilePicUrl?) {
    return this.firedata.child(`${this.afAuth.auth.currentUser.uid}/profile/personalInfo`).update({
      // fname: newUser.fname,
      // lname: newUser.lname,
      email: newUser.email,
      // gender: newUser.gender,
      // birthdate: newUser.birthdate,
      // photoURL: profilePicUrl ? profilePicUrl : '',
      // provider: newUser.provider ? newUser.provider : ''
    });
  }

  passwordReset(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    this.idle.stop();
    return firebase.auth().signOut();
  }

  updatePhotoString(profilePic) {
    if (profilePic) {
      firebase
        .storage()
        .ref(`images/${this.afAuth.auth.currentUser.uid}.jpg`)
        .putString(profilePic, 'base64')
        .then((snapshot) => {
          {
            snapshot.ref.getDownloadURL().then((profilePicUrl) => {
              this.firedata.child(`${this.afAuth.auth.currentUser.uid}/profile/personalInfo`).update({
                photoURL: profilePicUrl ? profilePicUrl : ''
              });
            });
          }
        });
    }
  }

  updatePwd(newPwd: string) {
    return firebase.auth().currentUser.updatePassword(newPwd);
  }

  initializeIdleTimeOut() {
    this.idle.setIdle(5);

    this.idle.setTimeout(900);

    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleTimeout();
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.getUserLoggedIn().subscribe((userLoggedIn) => {
      if (userLoggedIn) {
        this.idle.watch();
      } else {
        this.idle.stop();
      }
    });
  }
  reset() {
    this.idle.watch();
    this.timedOut = false;
  }
  async idleTimeout() {
    const alert = await this.alertController.create({
      header: 'Session Timeout',
      message: 'Your session has been timed out.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Login Again',
          handler: () => {
            this.ngZone.run(() => {
              this.logout().then(() => this.navCtrl.navigateRoot('/login'));
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
