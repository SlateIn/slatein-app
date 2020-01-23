import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() { }

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
