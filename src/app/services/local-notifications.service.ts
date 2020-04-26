import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { TaskReminderInfo } from '@models/taskDetails';
const { LocalNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() { }

  scheduleAt(data: TaskReminderInfo) {
    LocalNotifications.schedule({
      notifications: [
        {
          title: data.title,
          body: data.desc,
          id: data.id,
          schedule: {
            every: data.repeat !== 'never' ? data.repeat : null,
            at: new Date(data.startTimePeriod)
          },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  async cancelNotifications() {
    const pendingNotifs = await Plugins.LocalNotifications.getPending();
    pendingNotifs && Plugins.LocalNotifications.cancel(pendingNotifs);
  }

}
