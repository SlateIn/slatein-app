import { Component, OnInit, Input } from '@angular/core';
import { TaskReminderInfo } from '@models/taskDetails';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.scss'],
})
export class TaskInfoCardComponent implements OnInit {

  @Input()
  taskinfo: TaskReminderInfo;


  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskinfo.path, this.taskinfo.id).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

}
