import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-info.service';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { LocalNotificationsService } from '@services/local-notifications.service';
import { TaskService } from '@services/task.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TaskReminderInfo } from '@models/taskDetails';
import { filter, map } from 'rxjs/operators';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';


@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss'],
})
export class MydayPage implements OnInit, OnDestroy {
  info$: Observable<UserInfo>;
  taskForm: FormGroup;
  taskDetails: TaskReminderInfo[];
  errorMessage: string;
  reminderdate: any;
  taskInfoKeys: string[];
  todayDate = new Date();
  minDate: string;
  maxyear: string;
  getTaskSubscription$: Subscription;

  constructor(
    private notification: LocalNotificationsService,
    private taskService: TaskService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.minDate = this.todayDate.toISOString();
    this.maxyear = (this.todayDate.getFullYear() + 15).toString();
    // Get today's task 
    this.getTaskSubscription$ = this.taskService.getDailyTask.pipe(
      map(tasks => tasks.sort((a, b) => new Date(a.reminderdate).getTime() - new Date(b.reminderdate).getTime()))
    ).subscribe(tasks => this.taskDetails = tasks);
    this.taskForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reminderdate: new FormControl('', Validators.required),
      repeat: new FormControl('', Validators.required),
    });
  }

  async onSubmit(value) {
    const reminderdate = new Date(value.reminderdate);
    const path = `${reminderdate.getFullYear()}/${reminderdate.getMonth() + 1}/${reminderdate.getDate()}`;
    const id = `${reminderdate.getFullYear()}${reminderdate.getMonth() + 1}${reminderdate.getDate()}`;

    let data: TaskReminderInfo = {
      title: value.title,
      description: value.description,
      image: '',
      reminderdate: value.reminderdate,
      status: 'pending',
      repeat: value.repeat,
      path
    }
    this.notification.scheduleAt(data, id).then((id: number) => {
      data.id = id;
      this.taskService.createTask(data);
    });
    this.taskForm.reset();
  }
  
  ngOnDestroy(): void {
    this.getTaskSubscription$ && this.getTaskSubscription$.unsubscribe();
  }

}
