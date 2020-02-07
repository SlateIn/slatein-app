import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-info.service';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { LocalNotificationsService } from '@services/local-notifications.service';
import { TaskService } from '@services/task.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TaskReminderInfo } from '@models/taskDetails';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss'],
})
export class MydayPage implements OnInit, OnDestroy {
  info$: Observable<UserInfo>;
  taskForm: FormGroup;
  taskinfo: any;
  errorMessage: string;
  reminderdate: any;
  remindMeValue: boolean = false;
  taskInfoKeys: string[];
  todayDate = new Date();
  getTaskSubscription$: Subscription;

  constructor(
    private notification: LocalNotificationsService,
    private taskService: TaskService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    // Get today's task 
    this.getTaskSubscription$ = this.taskService.getTask.subscribe(tasks => {
      const todayTasks = tasks.filter(task => {
        const taskScheduleDate = new Date(task.reminderdate);
        return taskScheduleDate.getDay() === this.todayDate.getDay() &&
          taskScheduleDate.getMonth() === this.todayDate.getMonth() &&
          taskScheduleDate.getFullYear() === this.todayDate.getFullYear();
      })
      this.taskinfo = todayTasks;
      this.taskInfoKeys = Object.keys(todayTasks);
    });
    this.resetTaskForm();
  }

  resetTaskForm() {
    this.taskForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reminderdate: new FormControl('', Validators.required),
      repeat: new FormControl('', Validators.required),
    });
  }

  async onSubmit(value) {
    this.reminderdate = Date.now();
    let data: TaskReminderInfo = {
      title: value.title,
      description: value.description,
      image: '',
      reminderdate: value.reminderdate,
      status: 'pending',
      repeat: value.repeat,
    }
    this.notification.scheduleAt(data).then(id => {
      this.taskService.createTask({ ...data, reminderdate: data.reminderdate.toString() }, id);
    });
    this.remindMeValue = !this.remindMeValue;
  }

  addReminderEnable() {
    this.remindMeValue = !this.remindMeValue;
    this.resetTaskForm();
  }

  ngOnDestroy(): void {
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe
  }

}
