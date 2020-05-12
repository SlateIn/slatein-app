import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    this.showData();
  }

  showData(){
    console.log('Coming from Display Component', this.allTaskForDisplay);
  }
}
