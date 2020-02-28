import { Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';
import { Observable, Subscription, of, forkJoin } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, filter, tap, withLatestFrom, take, first, combineLatest, flatMap, mergeMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { TaskReminderInfo } from '@models/taskDetails';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  firedata = firebase.database().ref('/users/');
  currentUserUID: string;

  constructor(private auth: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  setScheduleCounter(data: TaskReminderInfo): Observable<number> {
    return this.auth.getCurrentUserUID().pipe(
      filter((uid) => !!uid),
      mergeMap((uid) => forkJoin(
        of(uid),
        this.db.object<number>(`/users/${uid}/events/${data.path}/scheduleCounter`).valueChanges().pipe(take(1))
      )),
      tap(([uid, counter]) => this.firedata.child(`${uid}/events/${data.path}`).update({ scheduleCounter: counter + 1 })),
      mergeMap(([uid, counter]) => {
        const count = counter + 1;
        return of(count);
      }));
  }

  scheduleAt(data: TaskReminderInfo, id: string) {
    return new Promise((resolve) => {
      this.setScheduleCounter(data).pipe(take(1)).subscribe(counter => {
        LocalNotifications.schedule({
          notifications: [
            {
              title: data.title,
              body: data.description,
              id: Number(`${id}${counter}`),
              schedule: {
                every: data.repeat, 
                at: new Date(data.reminderdate)  
              },
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null
            }
          ]
        });
        resolve(Number(`${id}${counter}`));
      });
    });
  }

  async cancelNotifications() {
    const pendingNotifs = await Plugins.LocalNotifications.getPending();
    pendingNotifs && Plugins.LocalNotifications.cancel(pendingNotifs);
  }

}
