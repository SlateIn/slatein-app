import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { UserInfo } from '@models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

   get info(): Observable<UserInfo> {
    return this.afAuth.authState.pipe(
      map(auth => auth.uid),
      switchMap(res => this.db.object<UserInfo>(`/users/${res}/profile/personalInfo`).valueChanges()));
   }

}
