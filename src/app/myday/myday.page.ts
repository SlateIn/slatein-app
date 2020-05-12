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
  allTask = [{
    category: 'task',
    title: 'our date night',
    time : '4:PM', // This can be date stamp which cna handle in child component using directive
    location: 'lucky Stark Tobacco Factory',
    description: 'Priyanka will pick me up after her clinic hours'
  },
  {
    category: 'task',
    title: 'our date night',
    time : '4:PM', // This can be date stamp which cna handle in child component using directive
    location: 'lucky Stark Tobacco Factory',
    description: 'Priyanka will pick me up after her clinic hours'
  },
  {
    category: 'task',
    title: 'our date night',
    time : '4:PM', // This can be date stamp which cna handle in child component using directive
    location: 'lucky Stark Tobacco Factory',
    description: 'Priyanka will pick me up after her clinic hours'
  },
  {
    category: 'task',
    title: 'our date night',
    time : '4:PM', // This can be date stamp which cna handle in child component using directive
    location: 'lucky Stark Tobacco Factory',
    description: 'Priyanka will pick me up after her clinic hours'
  }];
  
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

  constructor(private taskService: TaskService, private alertReminderService: AlertReminderService) {}

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
   * TODO : Provide data(All task from my day) to displayData component
   */

  setReminder() {
    this.alertReminderService.presentAlertPrompt('Add');
  }

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
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe();
    this.getAllTasksInfoSubscription && this.getAllTasksInfoSubscription.unsubscribe();
  }
}