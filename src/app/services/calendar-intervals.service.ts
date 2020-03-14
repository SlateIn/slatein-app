import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntervalsService {

  constructor() { }

  getIntervalDates(calendarTasks) {
    let events = [];
    let monthValue;
    let dayValue;
    let tasksProp;
    let newStartDate;
    let newEndDate;
    let startTime;
    let endTime;

    // TODO: make this iteration with ES6 and make it simple
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
              newStartDate = new Date(tasksProp.startDate);
              newEndDate = new Date(tasksProp.endDate);
              events.push({
                ...tasksProp,
                startTime: newStartDate,
                endTime: newEndDate,
                allDay: false,
              });
              // switch (typeof tasksProp.startDate === 'string') {
              //   case (tasksProp.repeat === 'week'):
              //     startTime = new Date(newStartDate.getTime() + (7 * 24 * 60 * 60 * 1000));
              //     endTime = new Date(newEndDate.getTime() + (7 * 24 * 60 * 60 * 1000));
              //     break;
              //   case (tasksProp.repeat === 'two-weeks'):
              //     startTime = new Date(newStartDate.getTime() + (14 * 24 * 60 * 60 * 1000));
              //     endTime = new Date(newEndDate.getTime() + (14 * 24 * 60 * 60 * 1000));
              //     break;
              //   case (tasksProp.repeat === 'month'):
              //     startTime = new Date(newStartDate.setMonth(newStartDate.getMonth() + 1));
              //     endTime = new Date(newEndDate.setMonth(newEndDate.getMonth() + 1));
              //     console.log(`startTime ::: ${startTime}`);
              //     console.log(`endTime ::: ${endTime}`);
              //     break;
              //   case (tasksProp.repeat === 'year'):
              //     startTime = new Date(newStartDate.setMonth(newStartDate.getMonth() + 12));
              //     endTime = new Date(newEndDate.setMonth(newEndDate.getMonth() + 12));
              //     break;
              //   default:
              //     startTime = tasksProp.startDate;
              //     endTime = tasksProp.endDate;
              // }
              // events.push({
              //   ...tasksProp,
              //   startTime: new Date(startTime),
              //   endTime: new Date(endTime),
              //   allDay: false,
              // });
            }
          }
        }
      }
    }
    console.log(events);
    return events;
  }

}
