import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor( private analytics: AngularFireAnalytics,
               private platform: Platform) {}

  // Tracks a custom event in Firebase Analytics
  logEvent(name: string, properties: object) {

    this.platform.ready().then(() => {
      // Ex. name="select-content" , properties = {content-type: "page-view", item-id: "home"}
      this.analytics.logEvent(name, properties);
      console.log('=====  Analytics Event Logged =====');
      console.log('name =' + name);
      console.log(properties);
      console.log('=========================');
    });
  }

  setUserProperty(key: string, value: string) {
    this.platform.ready().then(() => {
      //this.analytics.setUserProperties(value);
    });
  }

  setUserId(uid: string) {
    this.platform.ready().then(() => {
      this.analytics.setUserId(uid);
    });
  }

  //Track on 'screen-view' event in Firebase Analytics
  trackScreen(name: string) {
    this.platform.ready().then(() => {
      this.analytics.setCurrentScreen(name);
    });
  }
}
