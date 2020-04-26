import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { TaskReminderInfo } from "@models/taskDetails";
import { BehaviorSubject } from "rxjs";
import { map, take } from "rxjs/operators";
import { LoaderService } from "./loader.service";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root",
})
export class TaskService {
  private taskInfo$ = new BehaviorSubject<TaskReminderInfo[]>([]);

  constructor(
    private db: AngularFireDatabase,
    private loaderService: LoaderService
  ) {}

  getAllTasksInfo() {
    return this.taskInfo$.asObservable();
  }

  createTask(taskInfo: TaskReminderInfo) {
    return new Promise<any>((resolve, reject) => {
      return this.db
        .object(
          `/users/${firebase.auth().currentUser.uid}/events/tasks/${taskInfo.id}`
        )
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
      .list<TaskReminderInfo>(
        `/users/${firebase.auth().currentUser.uid}/events/tasks`
      )
      .valueChanges()
      .pipe(
        take(1),
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
                while (endDailyData.getTime() >= dailyDate.getTime()) {
                  const newTask = { ...task };
                  newTask.startTimePeriod = dailyDate.toString();
                  const dailyEnd = new Date(newTask.endTimePeriod);
                  dailyEnd.setDate(dailyDate.getDate());
                  dailyEnd.setMonth(dailyDate.getMonth());
                  dailyEnd.setFullYear(dailyDate.getFullYear());
                  newTask.endTimePeriod = new Date(dailyEnd).toString();
                  displayTaks.push(newTask);
                  dailyDate = new Date(
                    startDailyData.setDate(startDailyData.getDate() + 1)
                  );
                }
                break;
              case "month":
                const startMonthlyData = new Date(task.startTimePeriod);
                const endMonthlyData = new Date(task.endTimePeriod);
                let monthlyDate = startMonthlyData;
                while (endMonthlyData.getTime() >= monthlyDate.getTime()) {
                  const newTask = { ...task };
                  newTask.startTimePeriod = monthlyDate.toString();

                  const monthlyEnd = new Date(newTask.endTimePeriod);
                  monthlyEnd.setDate(monthlyDate.getDate());
                  monthlyEnd.setMonth(monthlyDate.getMonth());
                  monthlyEnd.setFullYear(monthlyDate.getFullYear());
                  newTask.endTimePeriod = new Date(monthlyEnd).toString();
                  displayTaks.push(newTask);
                  monthlyDate = new Date(
                    startMonthlyData.setMonth(startMonthlyData.getMonth() + 1)
                  );
                }
                break;
              case "two-weeks":
                const startBiWeeklyData = new Date(task.startTimePeriod);
                const endBiWeeklyData = new Date(task.endTimePeriod);
                let biWeeklyDate = startBiWeeklyData;
                while (endBiWeeklyData.getTime() >= biWeeklyDate.getTime()) {
                  const newTask = { ...task };
                  newTask.startTimePeriod = biWeeklyDate.toString();
                  const biWeekEnd = new Date(newTask.endTimePeriod);
                  biWeekEnd.setDate(biWeeklyDate.getDate());
                  biWeekEnd.setMonth(biWeeklyDate.getMonth());
                  biWeekEnd.setFullYear(biWeeklyDate.getFullYear());
                  newTask.endTimePeriod = new Date(biWeekEnd).toString();
                  displayTaks.push(newTask);
                  biWeeklyDate = new Date(
                    startBiWeeklyData.setDate(startBiWeeklyData.getDate() + 14)
                  );
                }
                break;
              case "week":
                const startWeeklyData = new Date(task.startTimePeriod);
                const endWeeklyData = new Date(task.endTimePeriod);
                let weeklyDate = startWeeklyData;
                while (endWeeklyData.getTime() >= weeklyDate.getTime()) {
                  const newTask = { ...task };
                  newTask.startTimePeriod = weeklyDate.toString();

                  const weeklyEnd = new Date(newTask.endTimePeriod);
                  weeklyEnd.setDate(weeklyDate.getDate());
                  weeklyEnd.setMonth(weeklyDate.getMonth());
                  weeklyEnd.setFullYear(weeklyDate.getFullYear());
                  newTask.endTimePeriod = new Date(weeklyEnd).toString();
                  displayTaks.push(newTask);
                  weeklyDate = new Date(
                    startWeeklyData.setDate(startWeeklyData.getDate() + 7)
                  );
                }
                break;
              case "year":
                const startYearlyData = new Date(task.startTimePeriod);
                const endYearlyData = new Date(task.endTimePeriod);
                let yearlyDate = startYearlyData;
                while (endYearlyData.getTime() > yearlyDate.getTime()) {
                  const newTask = { ...task };
                  newTask.startTimePeriod = yearlyDate.toString();

                  const yearEnd = new Date(newTask.endTimePeriod);
                  yearEnd.setDate(yearlyDate.getDate());
                  yearEnd.setMonth(yearlyDate.getMonth());
                  yearEnd.setFullYear(yearlyDate.getFullYear());
                  newTask.endTimePeriod = new Date(yearEnd).toString();
                  displayTaks.push(newTask);
                  yearlyDate = new Date(
                    startYearlyData.setFullYear(
                      startYearlyData.getFullYear() + 1
                    )
                  );
                }
                break;
            }
          });

          console.log(displayTaks);
          return displayTaks;
        }),
        take(1)
      )
      .subscribe(async (res) => {
        this.taskInfo$.next(res);
      });
  }
}
