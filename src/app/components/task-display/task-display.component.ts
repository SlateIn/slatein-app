import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fade } from '@app/animations';

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
  favourite: boolean = false;
  @Input() allTaskForDisplay: any;
  @Output() taskIdEmit: EventEmitter<[]> = new EventEmitter();
  @Output() makeItFavEmit: EventEmitter<[]> = new EventEmitter();
  constructor() { }

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
   * Getting ID of task form click event on column
   * @param id
   */
  getTaskId(id) {
    console.log(id, this.allTaskForDisplay);
    this.taskIdEmit.emit(id);
  }

  addToFav(task) {
    task.favourite = !task.favourite;
    this.makeItFavEmit.emit(task);
    // this.taskService.selectFavouriteTask(this.taskinfo.id, this.taskinfo.favourite);
    // this.favouriteChange.emit(this.taskinfo);
    // this.makeItFavEmit.emit(id);
  }
}
