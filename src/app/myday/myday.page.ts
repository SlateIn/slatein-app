import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../services/user-info.service";
import { Observable, Subscription } from "rxjs";
import { UserInfo } from "@models/userInfo";
import { LocalNotificationsService } from "@services/local-notifications.service";
import { TaskService } from "@services/task.service";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { TaskReminderInfo } from "@models/taskDetails";
import { filter, map, tap, take } from "rxjs/operators";
import { AlertReminderService } from "./services/alert-reminder.service";
import { LoaderService } from "@services/loader.service";

@Component({
  selector: "app-myday",
  templateUrl: "./myday.page.html",
  styleUrls: ["./myday.page.scss"],
})
export class MydayPage implements OnInit, OnDestroy {
  info$: Observable<UserInfo>;
  taskForm: FormGroup;
  taskDetails: TaskReminderInfo[];
  favouriteTaskDetails: TaskReminderInfo[];
  errorMessage: string;
  startDate: any;
  taskInfoKeys: string[];
  todayDate = new Date();
  minDate: string;
  maxyear: string;
  getTaskSubscription$: Subscription;
  segment: string;

  constructor(
    private notification: LocalNotificationsService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private alertReminderService: AlertReminderService
  ) {}

  ngOnInit() {
    const todaysDate = new Date();
    this.taskService
      .getAllTasks()
      .pipe(
        take(1),
        map((res) => {
          const todaysTask = [];

          res.forEach(task => {
            const taskStartTimePeriod = new Date(task.startTimePeriod);
            if(todaysDate.getFullYear() === taskStartTimePeriod.getFullYear() &&
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
        this.loaderService.dismiss();
      });

    // this.taskService.getAllTodaysTask();
    this.minDate = this.todayDate.toISOString();
    this.maxyear = (this.todayDate.getFullYear() + 15).toString();
    // Get today's task
    // this.getTaskSubscription$ = this.taskService.getDailyTask.pipe(
    //   map(tasks => tasks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()))
    // ).subscribe((tasks: TaskReminderInfo[]) => {
    //   this.taskDetails = tasks;
    //   this.favouriteTaskDetails = [];
    //   for (const task of this.taskDetails) {
    //     if (task.favourite === true) {
    //       this.favouriteTaskDetails.push(task);
    //     }
    //   }
    //   this.loaderService.dismiss();
    // });

    this.taskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      repeat: new FormControl("", Validators.required),
    });
    this.loaderService.present("Loading Your Tasklists");
  }

  setReminder() {
    this.alertReminderService.presentAlertPrompt("Add");
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ngOnDestroy(): void {
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe();
  }
}
