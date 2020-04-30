import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { TaskReminderInfo } from '@models/taskDetails';
import { TaskService } from '@services/task.service';
import { AlertReminderService } from '../services/alert-reminder.service';

@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.scss']
})
export class TaskInfoCardComponent implements OnInit {
  @Input()
  taskinfo: TaskReminderInfo;
  @Output()
  favoriteChange: EventEmitter<TaskReminderInfo> = new EventEmitter();

  constructor(private taskService: TaskService, private alertReminderService: AlertReminderService) {}

  ngOnInit() {}

  updateTask() {
    console.log(this.taskinfo);
    this.alertReminderService.presentAlertPrompt('Update');
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskinfo.id);
  }

  isFavouriteTask() {
    this.taskinfo.favourite = !this.taskinfo.favourite;
    this.taskService.selectFavouriteTask(this.taskinfo.id, this.taskinfo.favourite);
    this.favoriteChange.emit(this.taskinfo);
  }
}
