import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { TaskService } from '@services/task.service';
import { TaskReminderInfo } from '@models/taskDetails';
import { map } from 'rxjs/operators';
import { AlertReminderService } from './services/alert-reminder.service';

@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss']
})
export class MydayPage implements OnInit, OnDestroy {
  info$: Observable<UserInfo>;
  taskDetails: TaskReminderInfo[] = [];
  favouriteTaskDetails: TaskReminderInfo[] = [];
  errorMessage: string;
  startDate: any;
  taskInfoKeys: string[];
  todayDate = new Date();
  minDate: string;
  maxyear: string;
  getTaskSubscription$: Subscription;
  segment: string;
  getAllTasksInfoSubscription: Subscription;

  constructor(private taskService: TaskService, private alertReminderService: AlertReminderService) { }

  ngOnInit() {
    const todaysDate = new Date();
    this.getAllTasksInfoSubscription = this.taskService
      .getAllTasksInfo()
      .pipe(
        map((res) => {
          const todaysTask = [];
          res.forEach((task) => {
            const taskStartTimePeriod = new Date(task.startTimePeriod);
            if (
              todaysDate.getFullYear() === taskStartTimePeriod.getFullYear() &&
              todaysDate.getMonth() === taskStartTimePeriod.getMonth() &&
              todaysDate.getDate() === taskStartTimePeriod.getDate()
            ) {
              todaysTask.push(task);
            }
          });
          return todaysTask;
        })
      )
      .subscribe((tasks) => {
        this.taskDetails = tasks;
        this.favouriteTaskDetails = [];
        for (const task of this.taskDetails) {
          if (task.favourite === true) {
            this.favouriteTaskDetails.push(task);
          }
        }
      });
  }

  /**
   * Task ID, Incoming form task-display component
   * @param event
   */
  clickedTaskId(id: number) {
    console.log('This is id of clicked Task', id);
  }

  // setReminder() {
  //   this.alertReminderService.presentAlertPrompt('Add');
  // }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  updateFavorite(task) {
    const getIndex = this.favouriteTaskDetails.findIndex((value) => value.id === task.id);
    if (getIndex === -1 || task.favourite) {
      this.favouriteTaskDetails.push(task);
    } else if (!task.favourite) {
      this.favouriteTaskDetails.splice(getIndex, 1);
    }
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe();
    // tslint:disable-next-line:no-unused-expression
    this.getAllTasksInfoSubscription && this.getAllTasksInfoSubscription.unsubscribe();
  }
}