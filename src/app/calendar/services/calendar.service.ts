import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  getEvents(year: string): Observable<any> {
    return this.afAuth.authState.pipe(
      filter(auth => !!auth),
      map(auth => auth.uid),
      switchMap(uid => this.db.object<any>(`/users/${uid}/events/${year}`).valueChanges()));
  }

}
