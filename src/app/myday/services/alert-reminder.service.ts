import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskReminderInfo } from '@models/taskDetails';
import { LocalNotificationsService } from '@services/local-notifications.service';
import { TaskService } from '@services/task.service';

export interface Reminder {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertReminderService {
  todayDate = new Date();

  // tslint:disable-next-line: max-line-length
  minDate = `${this.todayDate.getFullYear()}-${String(this.todayDate.getMonth() + 1).padStart(2, '0')}-${String(this.todayDate.getDate()).padStart(2, '0')}`;
  // tslint:disable-next-line: max-line-length
  maxDate = `${this.todayDate.getFullYear() + 15}-${String(this.todayDate.getMonth() + 1).padStart(2, '0')}-${String(this.todayDate.getDate()).padStart(2, '0')}`;


  constructor(
    private alertController: AlertController,
    private notification: LocalNotificationsService,
    private taskService: TaskService, ) { }

  updateTask(task: TaskReminderInfo) {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.startDate);
    const reminderData: Reminder = {
      title: task.title,
      description: task.description,
      // tslint:disable-next-line: max-line-length
      startDate: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
      startTime: `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`,
      endDate: `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`,
      endTime: `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`
    }
    console.log(reminderData);
    this.presentAlertPrompt('Update', reminderData, task.repeat, task);
  }
  // tslint:disable-next-line: max-line-length
  async presentAlertPrompt(type: 'Add' | 'Update', reminderData?: Reminder, repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never', task?: TaskReminderInfo) {
    const alert = await this.alertController.create({
      header: 'Schedule task',
      backdropDismiss: false,
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: reminderData && reminderData.title,
          type: 'text'
        },
        {
          name: 'description',
          placeholder: 'Description',
          value: reminderData && reminderData.description,
          type: 'text'
        },
        {
          placeholder: 'startDate',
          value: 'Start Date',
          disabled: true
        },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          value: reminderData ? reminderData.startDate : this.minDate,
          min: this.minDate,
          max: this.maxDate
        },
        {
          placeholder: 'startTime',
          value: 'Start Time',
          disabled: true
        },
        {
          name: 'startTime',
          placeholder: 'Start Time',
          label: 'Start Time',
          type: 'time',
          value: reminderData && reminderData.startTime,
        },
        {
          placeholder: 'endDate',
          value: 'End Date',
          disabled: true
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          value: reminderData ? reminderData.endDate : this.minDate,
          min: this.minDate,
          max: this.maxDate
        },
        {
          placeholder: 'endTime',
          value: 'End Time',
          disabled: true
        },
        {
          name: 'endTime',
          label: 'End Time',
          type: 'time',
          value: reminderData && reminderData.endTime,
        },
      ],
      buttons: [
        {
          text: 'Repeat',
          handler: (data) => {
            this.presentAlertRadio(type, data, repeat, task);
          }
        },
        {
          text: type,
          handler: (data) => {
            if (data.title && data.description && data.startDate && data.startTime && data.endDate && data.endTime) {
              task ? this.onUpdate(data, repeat, task) : this.onSubmit(data, repeat);
              return true;
            }
            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
      ]
    });

    await alert.present();
  }

  async presentAlertRadio(type: 'Add' | 'Update', data: Reminder, repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never', task?: TaskReminderInfo) {
    const alert = await this.alertController.create({
      header: 'Repeat',
      backdropDismiss: false,
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Never',
          value: 'never',
          checked: repeat ? repeat === 'never' : true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Daily',
          value: 'day',
          checked: repeat && repeat === 'day'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Weekly',
          value: 'week',
          checked: repeat && repeat === 'week'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Biweekly',
          value: 'two-weeks',
          checked: repeat && repeat === 'two-weeks'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Monthly',
          value: 'month',
          checked: repeat && repeat === 'month'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Yearly',
          value: 'year',
          checked: repeat && repeat === 'year'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertPrompt('Add', data);
          }
        }, {
          text: 'Ok',
          handler: (value: 'year' | 'month' | 'two-weeks' | 'week' | 'day') => {
            this.presentAlertPrompt(type, data, value, task);
          }
        }
      ]
    });
    await alert.present();
  }

  async onSubmit(value: Reminder, repeat: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never' = 'never') {
    const getPaths = value.startDate.split('-');
    const path = `${getPaths[0]}/${getPaths[1]}/${getPaths[2]}`;
    const id = `${getPaths[0]}${getPaths[1]}${getPaths[2]}`;
    const startDate = new Date(value.startDate + ' ' + value.startTime).toString();
    const endDate = new Date(value.endDate + ' ' + value.endTime).toString();
    const data: TaskReminderInfo = {
      title: value.title,
      desc: value.description,
      image: '',
      startDate,
      status: 'pending',
      repeat,
      path,
      endDate
    };
    this.notification.scheduleAt(data, id).then((identifier: number) => {
      data.id = identifier;
      this.taskService.createTask(data);
    });
  }

  async onUpdate(value: Reminder, repeat: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never' = 'never', task: TaskReminderInfo) {
    const getPaths = value.startDate.split('-');
    const path = `${getPaths[0]}/${getPaths[1]}/${getPaths[2]}`;
    const id = `${getPaths[0]}${getPaths[1]}${getPaths[2]}`;
    const startDate = new Date(value.startDate + ' ' + value.startTime).toString();
    const endDate = new Date(value.endDate + ' ' + value.endTime).toString();
    const data: TaskReminderInfo = {
      ...task,
      title: value.title,
      description: value.description,
      image: '',
      startDate,
      status: 'pending',
      repeat,
      path,
      endDate
    };
    await this.notification.cancelNotifications(data.id.toString());
    await this.taskService.deleteTask(data.path, data.id);
    this.notification.scheduleAt(data, id).then((identifier: number) => {
      data.id = identifier;
      this.taskService.updateTask(data);
    });
  }

}
