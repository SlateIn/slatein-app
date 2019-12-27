import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {

  // All the variables required for ionic2-calender
  eventSource;

  calendar = {
    mode : 'month',
    currentDate: new Date()
  };

  constructor() { }

  onCurrentDateChanged(event: Date){
    console.log('Current date change: '+ event)
  }

  onRangeChanged(ev){
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime)
  }

  onEventSelected(event){
    console.log('Event Selected:' + event.startTime + '-' + event.endTime + ','+event.title)
  }

  onViewTitleChanged(title){
    console.log(title)
  }

  onTimeSelected(ev){
    console.log('slected time: ' + ev.selectedTime + ', hasEvents: '+
    (ev.events !== undefined && ev.events.length == 0) + ', disabled: ' + ev.disabled)
  }


  ngOnInit() {}

}
