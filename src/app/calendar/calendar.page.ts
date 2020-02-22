import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  datePickerObj: any = {};
  selectedDate;
  viewTitle;
  isToday: boolean;
  eventSource;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(
    public modalCtrl: ModalController
  ) { }


  ngOnInit() {
    // --- TODO: Only for testing ---
    //this.loadEvents();
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onCurrentDateChanged(event: Date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.changeMode('day');
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // async openDatePicker() {
  //   const datePickerModal = await this.modalCtrl.create({
  //     component: Ionic4DatepickerModalComponent,
  //     cssClass: 'li-ionic4-datePicker',
  //     componentProps: {
  //        'objConfig': this.datePickerObj,
  //        'selectedDate': this.selectedDate
  //     }
  //   });
  //   await datePickerModal.present();

  //   datePickerModal.onDidDismiss()
  //     .then((data) => {
  //       console.log(data);
  //       this.selectedDate = data.data.date;
  //     });
  // }

  createRandomEvents() {
    let events = [];
    for (let i = 0; i < 50; i += 1) {
      let date = new Date();
      let eventType = Math.floor(Math.random() * 2);
      let startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime,
          endTime,
          allDay: true
        });
      } else {
        let startMinute = Math.floor(Math.random() * 24 * 60);
        let endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime,
          endTime,
          allDay: false
        });
      }
    }
    return events;
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    let current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  }

  segmentChanged(event: CustomEvent) {
    console.log(event);
    this.changeMode(event.detail.value);
  }

}
