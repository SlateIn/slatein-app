import { Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, filter, tap, withLatestFrom } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService implements OnDestroy {

  firedata = firebase.database().ref('/users/');
  scheduleCounter: number;
  scheduleCounterSubscription$: Subscription;

  constructor(private auth: AuthService, private db: AngularFireDatabase) { 
    this.scheduleCounterSubscription$ = 
      this.getScheduleCounter().subscribe(res => {
        console.log('Value is: ',res)
        this.scheduleCounter = res + 1;
      });
  }

  getScheduleCounter(): Observable<number> {
    return this.auth.currentUserUID.pipe(
      filter(res => !!res),
      switchMap(res => this.db.object<number>(`/users/${res}/scheduleCounter`).valueChanges()));
   }

  setScheduleCounter(counter: number) {
    this.auth.currentUserUID.pipe(
      withLatestFrom(this.auth.currentUserUID, this.getScheduleCounter()),
      filter(([uid, counter]) => !!uid && !!counter),
      tap(([uid, counter]) => {
        this.firedata.child(`${uid}`).update({scheduleCounter: counter});
      })).subscribe();
   }

  async scheduleAt(title: string, body: string, scheduelAt: Date) {
    await this.setScheduleCounter(this.scheduleCounter);
    return LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: this.scheduleCounter,
          schedule: { at: scheduelAt },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  async scheduleRepeatingEvery(title: string, body: string, scheduelAt: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second') {
    await this.setScheduleCounter(this.scheduleCounter);
    return LocalNotifications.schedule({
      notifications: [{
        title: title,
        body: body,
        id: this.scheduleCounter,
        schedule: {
          every: scheduelAt
        }
      }]
    });
  }

  async cancelNotifications() {
    const pendingNotifs = await Plugins.LocalNotifications.getPending();
    pendingNotifs && Plugins.LocalNotifications.cancel(pendingNotifs);
  }

  ngOnDestroy() {
    this.scheduleCounterSubscription$ && this.scheduleCounterSubscription$.unsubscribe();
  }
  
}
