import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntervalsService {
  constructor() {}

  getIntervalDates(calendarTasks) {
    let events = [];
    calendarTasks.forEach((task) => {
      events.push({
        ...task,
        startTime: new Date(task.startTimePeriod),
        endTime: new Date(task.endTimePeriod),
        allDay: false
      });
    });
    return events;
  }
}
