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
  @Input() allTaskForDisplay: any;
  @Output() taskIdEmit: EventEmitter<[]> = new EventEmitter();
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
    console.log(id);
    this.taskIdEmit.emit(id);
  }
}
