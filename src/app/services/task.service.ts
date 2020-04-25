import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { TaskReminderInfo } from "@models/taskDetails";
import { Observable, forkJoin, of } from "rxjs";
import { map, switchMap, mergeMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  taskInfo$: Observable<TaskReminderInfo>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}


  createTask(taskInfo: TaskReminderInfo) {
    return new Promise<any>((resolve, reject) => {
      return this.db
        .object(
          `/users/${this.afAuth.auth.currentUser.uid}/events/tasks/${taskInfo.id}`
        )
        .set(taskInfo)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  deleteTask(path: string, id: number): Promise<void> {
    return this.db
      .object(
        `/users/${this.afAuth.auth.currentUser.uid}/events/${path}/tasks/${id}`
      )
      .remove();
  }

  selectFavouriteTask(path: string, id: number, status: boolean) {
    return this.db
      .object(
        `/users/${this.afAuth.auth.currentUser.uid}/events/${path}/tasks/${id}`
      )
      .update({ favourite: status });
  }

  getAllTasks() {
    return this.afAuth.authState
      .pipe(
        map((auth) => auth && auth.uid),
        switchMap((uid) =>
          this.db
            .list<TaskReminderInfo>(`/users/${uid}/events/tasks`)
            .valueChanges()
            .pipe(take(1))
        ),
        map((res) => {
          const displayTaks = [];
          
          res.forEach((task) => {

            switch (task.repeat) {  
              case "never":
                displayTaks.push(task);
                break;
              case "day":
                const startDailyData = new Date(task.startTimePeriod);
                const endDailyData = new Date(task.endTimePeriod);
                let dailyDate = startDailyData;
                while(endDailyData.getTime() >= dailyDate.getTime()) {
                  const newTask = {...task};
                  newTask.startTimePeriod = dailyDate.toString();
                  const dailyEnd= new Date(newTask.endTimePeriod);
                  dailyEnd.setDate(dailyDate.getDate());
                  dailyEnd.setMonth(dailyDate.getMonth());
                  dailyEnd.setFullYear(dailyDate.getFullYear());
                  newTask.endTimePeriod = new Date(dailyEnd).toString();
                  displayTaks.push(newTask);
                  dailyDate = new Date(startDailyData.setDate(startDailyData.getDate() + 1));
                }
                break;
              case "month":
                const startMonthlyData = new Date(task.startTimePeriod);
                const endMonthlyData = new Date(task.endTimePeriod);
                let monthlyDate = startMonthlyData;
                while(endMonthlyData.getTime() >= monthlyDate.getTime()) {
                  const newTask = {...task};
                  newTask.startTimePeriod = monthlyDate.toString();

                  const monthlyEnd= new Date(newTask.endTimePeriod);
                  monthlyEnd.setDate(monthlyDate.getDate());
                  monthlyEnd.setMonth(monthlyDate.getMonth());
                  monthlyEnd.setFullYear(monthlyDate.getFullYear());
                  newTask.endTimePeriod = new Date(monthlyEnd).toString();
                  displayTaks.push(newTask);
                  monthlyDate = new Date(startMonthlyData.setMonth(startMonthlyData.getMonth()+1));
                }
                break;
              case "two-weeks":
                const startBiWeeklyData = new Date(task.startTimePeriod);
                const endBiWeeklyData = new Date(task.endTimePeriod);
                let biWeeklyDate = startBiWeeklyData;
                while(endBiWeeklyData.getTime() >= biWeeklyDate.getTime()) {
                  const newTask = {...task};
                  newTask.startTimePeriod = biWeeklyDate.toString();
                  const biWeekEnd= new Date(newTask.endTimePeriod);
                  biWeekEnd.setDate(biWeeklyDate.getDate());
                  biWeekEnd.setMonth(biWeeklyDate.getMonth());
                  biWeekEnd.setFullYear(biWeeklyDate.getFullYear());
                  newTask.endTimePeriod = new Date(biWeekEnd).toString();
                  displayTaks.push(newTask);
                  biWeeklyDate = new Date(startBiWeeklyData.setDate(startBiWeeklyData.getDate() + 14));
                }
                break;
              case "week":
                const startWeeklyData = new Date(task.startTimePeriod);
                const endWeeklyData = new Date(task.endTimePeriod);
                let weeklyDate = startWeeklyData;
                while(endWeeklyData.getTime() >= weeklyDate.getTime()) {
                  const newTask = {...task};
                  newTask.startTimePeriod = weeklyDate.toString();

                  const weeklyEnd= new Date(newTask.endTimePeriod);
                  weeklyEnd.setDate(weeklyDate.getDate());
                  weeklyEnd.setMonth(weeklyDate.getMonth());
                  weeklyEnd.setFullYear(weeklyDate.getFullYear());
                  newTask.endTimePeriod = new Date(weeklyEnd).toString();
                  displayTaks.push(newTask);
                  weeklyDate = new Date(startWeeklyData.setDate(startWeeklyData.getDate() + 7));
                }
                break;
              case "year":
                const startYearlyData = new Date(task.startTimePeriod);
                const endYearlyData = new Date(task.endTimePeriod);
                let yearlyDate = startYearlyData;
                while(endYearlyData.getTime() > yearlyDate.getTime()) {
                  const newTask = {...task};
                  newTask.startTimePeriod = yearlyDate.toString();

                  const yearEnd= new Date(newTask.endTimePeriod);
                  yearEnd.setDate(yearlyDate.getDate());
                  yearEnd.setMonth(yearlyDate.getMonth());
                  yearEnd.setFullYear(yearlyDate.getFullYear());
                  newTask.endTimePeriod = new Date(yearEnd).toString();
                  displayTaks.push(newTask);
                  yearlyDate = new Date(startYearlyData.setFullYear(startYearlyData.getFullYear()+1));
                }
                break;
            }
          });

          console.log(displayTaks);
          return displayTaks;
        })
      );
  }
}


// date === task.startDate && 