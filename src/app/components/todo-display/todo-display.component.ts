import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { fade } from '@app/animations';


@Component({
  selector: 'app-todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.scss'],
  animations: [
    fade
  ]
})
export class TodoDisplayComponent implements OnInit {
  tile: boolean = true;
  @Input() allToDoForDisplay: any;
  @Output() todoIdEmit: EventEmitter<[]> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.showData();
  }

  /**
   * just to display incoming data from parent
   */
  showData() {
    console.log('Coming from Display Component', this.allToDoForDisplay);
  }

  /**
   * Getting Todo of task form click event on column
   * @param id
   */
  getTodoId(id) {
    console.log(id);
    this.todoIdEmit.emit(id);
  }

}
