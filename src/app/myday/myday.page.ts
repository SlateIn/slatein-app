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
 /**
  * Below allTask array is a mock data for UI purpose only
  * 
  */
  allTask = [{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  },{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  },{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  },{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  },{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  },{
    id: 1,
    category: 'task',
    title: 'Watch Moive',
    time: '4:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Watch any movie on netflix, iptv or youtube'
  },
  {
    id: 2,
    category: 'task',
    title: '600 Class',
    time: '4:00AM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for midterm exam'
  },
  {
    id: 3,
    category: 'task',
    title: '603 Class',
    time: '1:00PM', // This can be date stamp which cna handle in child component using directive
    description: 'Prepare for final exam'
  },
  {
    id: 4,
    category: 'task',
    title: 'Homework',
    time: '9:20AM', // This can be date stamp which cna handle in child component using directive
    description: 'Start homework for both subjects'
  }];

  pageTitle = 'My Day';
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
  clickedTaskId(id: number ) {
    console.log('This is id of clicked Task', id);
  }

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