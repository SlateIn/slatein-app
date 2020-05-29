import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fade } from '@app/animations';
import { ModalController } from '@ionic/angular';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.scss'],
  animations: [
    fade
   ]
})
export class TaskDisplayComponent implements OnInit {
  tile: boolean = true;
  @Input() allTaskForDisplay: any;
  @Output() taskIdEmit: EventEmitter<[]> = new EventEmitter();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.showData();
  }

  /**
   * just to display incoming data from parent
   */
  showData() {
    console.log('Coming from Display Component', this.allTaskForDisplay);
  }

  /**
   * Getting taskData of task form click event on column
   * @param taskData
   */
  async getTaskId(taskData) {
    console.log(taskData);
    // this.taskIdEmit.emit(taskData);
    const myDayNewTask = await this.modalController.create({
      component: NewTaskComponent,
      componentProps: {taskData}
    });
    return await myDayNewTask.present();
  }
}
