import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap, filter } from 'rxjs/operators';
import { UserInfo } from '@models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {}

  get info(): Observable<UserInfo> {
    return this.afAuth.authState.pipe(
      filter((auth) => !!auth),
      map((auth) => auth.uid),
      switchMap((res) => this.db.object<UserInfo>(`/users/${res}/profile/personalInfo`).valueChanges())
    );
  }

  updateUserInfo(user: UserInfo) {
    return this.db.object(`/users/${this.afAuth.auth.currentUser.uid}/profile/personalInfo`).update({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      photoURL: user.photoURL
    });
  }
}
