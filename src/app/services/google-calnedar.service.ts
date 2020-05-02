import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalnedarService {
  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor(private afAuth: AngularFireAuth) { 
    this.initClient();
    this.user$ = afAuth.authState;
  }

  initClient() {
    gapi.load('client', () => {
      gapi.client.init({
        clientId: '773130234220-357ic8353tg1jo4fngjeojpak7ts02eo.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calndar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calnedar'));
    })
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential = firebase.auth.GoogleAuthProvider.credential(token);

    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  }

  async logout() {
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
  }

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });

    console.log(events);
    this.calendarItems = events.result.items;
    return this.calendarItems;
  }



}
