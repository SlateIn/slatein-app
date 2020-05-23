import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TaskReminderInfo } from '@models/taskDetails';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskInfo$ = new BehaviorSubject<TaskReminderInfo[]>([]);
  constructor(private db: AngularFireDatabase, private loaderService: LoaderService) {}

  getAllTasksInfo() {
    return this.taskInfo$.asObservable();
  }

  createTask(taskInfo: TaskReminderInfo) {
    return new Promise<any>((resolve, reject) => {
      return this.db
        .object(`/users/${firebase.auth().currentUser.uid}/events/tasks/${taskInfo.id}`)
        .set(taskInfo)
        .then(
          (res) => {
            resolve(res);
            this.getAllTasks();
          },
          (err) => reject(err)
        );
    });
  }

  deleteTask(id: number): Promise<void> {
    return this.db
      .object(`/users/${firebase.auth().currentUser.uid}/events/tasks/${id}`)
      .remove()
      .then(() => this.getAllTasks());
  }

  selectFavouriteTask(id: number, status: boolean) {
    return this.db
      .object(`/users/${firebase.auth().currentUser.uid}/events/tasks/${id}`)
      .update({ favourite: status })
      .then(() => this.getAllTasks());
  }

  getAllTasks() {
    this.db
      .list<TaskReminderInfo>(`/users/${firebase.auth().currentUser.uid}/events/tasks`)
      .valueChanges()
      .pipe(
        take(1),
        map((res) => {
          const displayTask = this.getDisplayTasks(res);
          return displayTask;
        }),
        take(1)
      )
      .subscribe(async (res) => {
        this.taskInfo$.next(res);
      });
  }

  getUntilDateNeverEndTasks(startDateOfMonth: Date, untilDate: Date) {
    return this.db
      .list<TaskReminderInfo>(`/users/${firebase.auth().currentUser.uid}/events/tasks`)
      .valueChanges()
      .pipe(
        map((res) => {
          const tasks = [];
          res.forEach((task) => {
            if (task.neverEnd) {
              tasks.push(task);
            }
          });
          return tasks;
        }),
        map((tasks) => {
          return this.getDisplayTasks(tasks, startDateOfMonth, untilDate, true);
        }),
        take(1)
      );
  }

  getDisplayTasks(
    res: TaskReminderInfo[],
    startDateOfMonth: Date = null,
    untilDate: Date = null,
    repeatForNever: boolean = false
  ) {
    const displayTaks = [];

    res.forEach((task) => {
      let startTimePeriod = new Date(task.startTimePeriod);
      let startData: Date;
      if (startDateOfMonth) {
        startData = new Date(startDateOfMonth.toString());
        startData.setHours(startTimePeriod.getHours());
        startData.setMinutes(startTimePeriod.getMinutes());
      }

      const date = new Date();
      const endData = untilDate
        ? untilDate
        : task.neverEnd
        ? new Date(date.getFullYear(), date.getMonth() + 1, 0, 24)
        : new Date(task.endTimePeriod);

      // console.log(task.onlyEndTime);
      const endTime = task.onlyEndTime.split(':');
      if (task.repeat === 'never' && !repeatForNever) {
        displayTaks.push(task);
      } else if (task.repeat !== 'never' || repeatForNever) {
        while (endData.getTime() >= startTimePeriod.getTime()) {
          const newTask = { ...task };
          newTask.startTimePeriod = startTimePeriod.toString();
          const end = new Date();
          end.setDate(startTimePeriod.getDate());
          end.setMonth(startTimePeriod.getMonth());
          end.setFullYear(startTimePeriod.getFullYear());
          end.setHours(Number(endTime[0]));
          end.setMinutes(Number(endTime[1]));

          newTask.endTimePeriod = new Date(end).toString();

          if (
            !repeatForNever ||
            (startTimePeriod.getTime() < untilDate.getTime() && startTimePeriod.getTime() > startData.getTime())
          ) {
            displayTaks.push(newTask);
          }
          switch (task.repeat) {
            case 'day':
              startTimePeriod = new Date(startTimePeriod.setDate(startTimePeriod.getDate() + 1));
              break;
            case 'month':
              startTimePeriod = new Date(startTimePeriod.setMonth(startTimePeriod.getMonth() + 1));
              break;
            case 'two-weeks':
              startTimePeriod = new Date(startTimePeriod.setDate(startTimePeriod.getDate() + 14));
              break;
            case 'week':
              startTimePeriod = new Date(startTimePeriod.setDate(startTimePeriod.getDate() + 7));
              break;
            case 'year':
              startTimePeriod = new Date(startTimePeriod.setFullYear(startTimePeriod.getFullYear() + 1));
              break;
          }
        }
      }
    });
    return displayTaks;
  }
}
