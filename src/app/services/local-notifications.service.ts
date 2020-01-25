import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  firedata = firebase.database().ref('/users/');

  
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  getScheduleCounter(): Observable<number> {
    return this.afAuth.authState.pipe(
      map(auth => auth.uid),
      switchMap(res => this.db.object<number>(`/users/${res}/scheduleCounter`).valueChanges()));
   }

  setScheduleCounter(counter: number) {
    return this.firedata.child(`${this.afAuth.auth.currentUser.uid}`).update({
      scheduleCounter: counter
    });
   }

  scheduleAt(title: string, body: string, id: number, scheduelAt: Date) {
    return LocalNotifications.schedule({
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
  }

  scheduleRepeatingEvery(title: string, body: string, id: number, scheduelAt: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second') {
    return LocalNotifications.schedule({
      notifications: [{
        title: title,
        body: body,
        id: id,
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
  
}
