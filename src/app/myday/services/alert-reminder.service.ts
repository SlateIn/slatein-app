import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskReminderInfo } from '@models/taskDetails';
import { LocalNotificationsService } from '@services/local-notifications.service';
import { TaskService } from '@services/task.service';

export interface Reminder {
  repetationPicker?: any;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertReminderService {
  todayDate = new Date();

  // tslint:disable-next-line: max-line-length
  minDate = `${this.todayDate.getFullYear()}-${String(this.todayDate.getMonth() + 1).padStart(2, '0')}-${String(
    this.todayDate.getDate()
  ).padStart(2, '0')}`;
  // tslint:disable-next-line: max-line-length
  maxDate = `${this.todayDate.getFullYear() + 15}-${String(this.todayDate.getMonth() + 1).padStart(2, '0')}-${String(
    this.todayDate.getDate()
  ).padStart(2, '0')}`;

  constructor(
    private alertController: AlertController,
    private notification: LocalNotificationsService,
    private taskService: TaskService
  ) { }

  // tslint:disable-next-line: max-line-length
  async presentAlertPrompt(
    type: 'Add' | 'Update',
    reminderData?: Reminder,
    repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never'
  ) {
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
          value: reminderData && reminderData.startTime
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
          value: reminderData && reminderData.endTime
        }
      ],
      buttons: [
        {
          text: 'Repeat',
          handler: (data) => {
            this.presentAlertRadio(data);
          }
        },
        {
          text: type,
          handler: (data) => {
            if (data.title && data.description && data.startDate && data.startTime && data.endTime) {
              this.onSubmit(data, repeat, 'add');
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
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio(data: Reminder) {
    const alert = await this.alertController.create({
      header: 'Repeat',
      backdropDismiss: false,
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Never',
          value: 'never',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Daily',
          value: 'day'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Weekly',
          value: 'week'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Biweekly',
          value: 'two-weeks'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Monthly',
          value: 'month'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Yearly',
          value: 'year'
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
        },
        {
          text: 'Ok',
          handler: (repeat: 'year' | 'month' | 'two-weeks' | 'week' | 'day') => {
            this.presentAlertPrompt('Add', data, repeat);
          }
        }
      ]
    });
    await alert.present();
  }

  async onSubmit(value: Reminder, repeat, type: any) {
    const startTimePeriod = new Date(value.startDate).toString();
    // tslint:disable-next-line:max-line-length
    const endTimePeriod = (!value.endDate || value.endDate === 'never') ? 'never' : new Date(value.endDate).toString();
    const onlyEndTime = `${new Date(value.endTime).getHours()} : ${new Date(value.endTime).getMinutes()}`;

    if (type === undefined || type === null) {
      const data: TaskReminderInfo = {
        title: value.title,
        desc: value.description,
        image: '',
        status: 'pending',
        repeat,
        favourite: false,
        id: Date.now(),
        startTimePeriod,
        endTimePeriod,
        onlyEndTime,
        neverEnd: endTimePeriod === 'never'
      };
      this.taskService.createTask(data);
      this.notification.scheduleAt(data);
    } else {
      const data = {
        title: value.title,
        desc: value.description,
        image: '',
        status: 'pending',
        repeat : value.repetationPicker,
        favourite: false,
        id: type,
        startTimePeriod,
        endTimePeriod,
        onlyEndTime,
        neverEnd: endTimePeriod === 'never'
      };
      this.taskService.updateTask(data);
    }
  }
}