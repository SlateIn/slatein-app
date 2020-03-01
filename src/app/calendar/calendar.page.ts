import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, OnInit, ViewEncapsulation, wtfStartTimeRange, wtfEndTimeRange, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CalendarService } from './services/calendar.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
  view: string;
  selectedDate;
  viewTitle;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  minDate = new Date().toISOString();

  isToday: boolean;
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  getCalendarEvents$: Subscription;

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(
    public modalCtrl: ModalController,
    public calService: CalendarService,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string
  ) { }


  ngOnInit() {
    const todaysDate = new Date();
    const year = `${todaysDate.getFullYear()}`;
    this.getCalendarEvents$ = this.calService.getEvents(year).subscribe(
      tasks => this.loadEvents(tasks)
    );
    this.view = 'month';
  }

  addEvents() {

  }

  loadEvents(calendarTasks) {
    this.eventSource = this.getEventsStructure(calendarTasks);
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

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev) {
    // let selected = new Date(ev.selecedTime);
    // this.event.startTime = selected.toISOString();
    // selected.setHours(selected.getHours() + 1);
    // this.event.endTime = (selected.toISOString());
  }

  changeMode(mode) {
    this.view = mode;
    this.calendar.mode = mode;
  }

  getEventsStructure(calendarTasks) {
    let events = [];
    let monthValue;
    let dayValue;
    let tasksProp;

    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: forin
    for (let propName in calendarTasks) {
      if (calendarTasks.hasOwnProperty(propName)) {
        monthValue = calendarTasks[propName];
      }
      for (let dayProp in monthValue) {
        if (monthValue.hasOwnProperty(dayProp)) {
          dayValue = monthValue[dayProp];
          for (let dailyTask in dayValue.tasks) {
            if (dayValue.tasks.hasOwnProperty(dailyTask)) {
              tasksProp = dayValue.tasks[dailyTask];
              events.push({
                title: tasksProp.title,
                desc: tasksProp.description,
                startTime: new Date(tasksProp.startDate),
                endTime: new Date(tasksProp.endDate),
                allDay: false,
              });
            }
          }
        }
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
    this.changeMode(event.detail.value);
  }

}
