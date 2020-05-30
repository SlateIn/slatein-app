import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { CalendarService } from './services/calendar.service';
import { Subscription, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { CalendarIntervalsService } from '@services/calendar-intervals.service';
import { TaskService } from '@services/task.service';
import { map } from 'rxjs/operators';
import { CalenderPopoverComponent } from './calender-popover/calender-popover.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit, OnDestroy {
  pageTitle = 'Calendar';
  view: string;
  selectedDate;
  viewTitle;
  minDate = new Date().toISOString();

  isToday: boolean;
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  getCalendarEvents$: Subscription;
  getAllTasks$: Subscription;
  getAllTasks: any[];

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(
    public modalCtrl: ModalController,
    public calService: CalendarService,
    private popoverCtrl: PopoverController,
    public calendarIntervalsService: CalendarIntervalsService,
    private taskService: TaskService,
    private modalController: ModalController,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.getAllTasks$ = this.taskService
      .getAllTasksInfo()
      .pipe(map((res) => this.calendarIntervalsService.getIntervalDates(res)))
      .subscribe((res) => (this.getAllTasks = res));
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onCurrentDateChanged(event: Date) {
    const startDateOfMonth = new Date(event.getFullYear(), event.getMonth(), 0, 24);
    const lastDateOfMonth = new Date(event.getFullYear(), event.getMonth() + 1, 0, 24);
    // tslint:disable-next-line:max-line-length
    const isDataAvailable = this.getAllTasks.find(task => task.neverEnd && (task.startTime.getTime() < lastDateOfMonth.getTime() && task.startTime.getTime() > startDateOfMonth.getTime()));
    if (!isDataAvailable) {
      this.taskService.getUntilDateNeverEndTasks(startDateOfMonth, lastDateOfMonth)
      .pipe(map((res) => this.calendarIntervalsService.getIntervalDates(res)))
      .subscribe((res) => {
        this.getAllTasks = [...this.getAllTasks, ...res];
      });
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    console.log(event);
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    await (this.popoverCtrl.create({component: CalenderPopoverComponent,
      showBackdrop: false, componentProps: { calenderTaskData: event}})).then((popoverEement) => {
        popoverEement.present();
    });
  }

  changeMode(mode) {
    this.view = mode;
    this.calendar.mode = mode;
  }

  // Change current month/week/day
  next() {
    let swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    let swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    let current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  segmentChanged(event: CustomEvent) {
    this.changeMode(event.detail.value);
  }

  ngOnDestroy(): void {
    this.getAllTasks$ && this.getAllTasks$.unsubscribe();
  }
}
