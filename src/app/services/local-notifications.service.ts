import { Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';
import { Observable, Subscription, of, forkJoin } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, filter, tap, withLatestFrom, take, first, combineLatest, flatMap, mergeMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  firedata = firebase.database().ref('/users/');
  currentUserUID: string;

  constructor(private auth: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.setScheduleCounter().subscribe(res => console.log(res));
  }

  getScheduleCounter(): Observable<number> {
    return this.auth.getCurrentUserUID().pipe(
      switchMap(res => this.db.object<number>(`/users/${res}/scheduleCounter`).valueChanges()));
  }

  setScheduleCounter(): Observable<number> {
    return this.auth.getCurrentUserUID().pipe(
      filter((uid) => !!uid),
      mergeMap((uid) => forkJoin(
        of(uid),
        this.db.object<number>(`/users/${uid}/scheduleCounter`).valueChanges().pipe(take(1))
      )),
      tap(([uid, counter]) => this.firedata.child(`${uid}`).update({ scheduleCounter: counter + 1 })),
      mergeMap(([uid, counter]) => {
        const count = counter + 1;
        return of(count);
      }));
  }

  scheduleAt(title: string, body: string, scheduelAt: Date) {
    return new Promise((resolve, reject) => {
      this.setScheduleCounter().pipe(take(1)).subscribe(id => {
        LocalNotifications.schedule({
          notifications: [
            {
              title: title,
              body: body,
              id: id,
              schedule: { at: scheduelAt },
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null
            }
          ]
        });
        resolve();
      });
    });
  }

  scheduleRepeatingEvery(title: string, body: string, scheduelAt: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second') {
    return new Promise((resolve, reject) => {
      this.setScheduleCounter().pipe(take(1)).subscribe(id => {
        LocalNotifications.schedule({
          notifications: [{
            title: title,
            body: body,
            id: id,
            schedule: {
              every: scheduelAt
            }
          }]
        });
        resolve();
      });
    });
  }

  async cancelNotifications() {
    const pendingNotifs = await Plugins.LocalNotifications.getPending();
    pendingNotifs && Plugins.LocalNotifications.cancel(pendingNotifs);
  }

}
