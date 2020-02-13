import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-info.service';
import { Observable } from 'rxjs';
import { UserInfo } from '@models/userInfo';
import { LocalNotificationsService } from '@services/local-notifications.service';
import { TaskService } from '@services/task.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TaskReminderInfo } from '@models/taskDetails';


@Component({
  selector: 'app-myday',
  templateUrl: './myday.page.html',
  styleUrls: ['./myday.page.scss'],
})
export class MydayPage implements OnInit {
  info$: Observable<UserInfo>;
  taskForm: FormGroup;
  taskinfo: any;
  errorMessage: string;
  reminderdate: any;
  remindMeValue: boolean = false;
  taskInfoKeys: string[];
  constructor(private user: UserService,
              private notification: LocalNotificationsService,
              private taskService: TaskService, 
              private fb: FormBuilder, ) { }
  
  async ngOnInit() {

    // Get All Task 
    this.taskService.getTask.subscribe(res => {
      this.taskinfo = res;
      this.taskInfoKeys = Object.keys(res);
      console.log(this.taskinfo);
    });
    
    this.info$ = this.user.info;
    this.taskForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reminderdate: new FormControl('', Validators.required),
    });
  }

  async onSubmit(value){
    this.reminderdate = Date.now();
    let data: TaskReminderInfo  = {
      title: value.title,
      description: value.description,
      image: '',
      reminderdate: value.reminderdate,
      status: 'pending',
      repeat: '',
    }
    this.notification.scheduleAt(data).then(id =>{
      this.taskService.createTask({...data, reminderdate: data.reminderdate.toString()},id);
    });
    this.remindMeValue = !this.remindMeValue;
  }
  addReminderEnable($event){
    this.remindMeValue = !this.remindMeValue;
      this.taskForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reminderdate: new FormControl('', Validators.required),
    });
  }
}
