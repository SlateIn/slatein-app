import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    this.showData();
  }

  showData(){
    console.log('Coming from Display Component', this.allToDoForDisplay);
  }

}
