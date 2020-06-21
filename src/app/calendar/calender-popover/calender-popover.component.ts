import { Component, OnInit, Input } from '@angular/core';
import { NewTaskComponent } from '@app/myday/new-task/new-task.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calender-popover',
  templateUrl: './calender-popover.component.html',
  styleUrls: ['./calender-popover.component.scss'],
})
export class CalenderPopoverComponent implements OnInit {
  @Input() calenderTaskData: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // console.log('Inside calenderPopOver');
    // console.log(this.calenderTaskData);
  }

  async editCalender() {
    const taskData = this.calenderTaskData;
    const myDayNewTask = await this.modalController.create({
      component: NewTaskComponent,
      componentProps: {taskData}
    });
    return await myDayNewTask.present();
  }
}
