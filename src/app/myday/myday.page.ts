import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
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
import { map } from "rxjs/operators";
import { AlertReminderService } from "./services/alert-reminder.service";

@Component({
  selector: "app-myday",
  templateUrl: "./myday.page.html",
  styleUrls: ["./myday.page.scss"],
})
export class MydayPage implements OnInit, OnDestroy {
  info$: Observable<UserInfo>;
  taskForm: FormGroup;
  taskDetails: TaskReminderInfo[];
  favouriteTaskDetails: TaskReminderInfo[] = [];
  errorMessage: string;
  startDate: any;
  taskInfoKeys: string[];
  todayDate = new Date();
  minDate: string;
  maxyear: string;
  getTaskSubscription$: Subscription;
  segment: string;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private alertReminderService: AlertReminderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const todaysDate = new Date();
    this.taskService
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

    this.taskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      repeat: new FormControl("", Validators.required),
    });
  }

  setReminder() {
    this.alertReminderService.presentAlertPrompt("Add");
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  updateFavorite(task) {
    const getIndex = this.favouriteTaskDetails.findIndex(value => value.id === task.id);
    if(getIndex === -1 || task.favourite) {
      this.favouriteTaskDetails.push(task)
    } else if(!task.favourite) {
      this.favouriteTaskDetails.splice(getIndex, 1);
    }

  }

  ngOnDestroy(): void {
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe();
  }
}
