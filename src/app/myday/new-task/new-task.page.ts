import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, NavController} from '@ionic/angular';
import { Time } from '@angular/common';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  image = "../../../assets/icon/profile.png";
  taskForm: FormGroup;
  title: string;
  description: string;
  remindMeValue: boolean = false;
  reminderdate: Date;
  remindmetime: Time;
  repeat:string;
  currentDate = new Date().getFullYear();
  futureDate = this.currentDate + 100;
  

  remindMeLocation: boolean = false;
  remindMeMessaging: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: new FormControl('New Reminder', Validators.required),
      description: new FormControl('', Validators.required),
      //remindme: new FormControl('', Validators.required),
      reminderdate: new FormControl('', Validators.required),
      remindmetime: new FormControl('', Validators.required),
      repeat: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    let data = {
      title: value.title,
      description: value.description,
      image: this.image,
      reminderdate: value.reminderdate,
      repeat: value.repeat,
      remindmetime: value.remindmetime

    }
    this.taskService.createTask(data)
    .then(
      res => {
        this.navCtrl.navigateBack('/tabs/myday');
      }
    )
  }

  remindme($event){
    this.remindMeValue = !this.remindMeValue;
    console.log(this.remindMeValue);
  }

  remindmeLocation($event){
    this.remindMeLocation = !this.remindMeLocation;
    console.log(this.remindMeLocation);
  }

  remindmeMessaging($event){
    this.remindMeMessaging = !this.remindMeMessaging;
    console.log(this.remindMeMessaging);
  }

}
