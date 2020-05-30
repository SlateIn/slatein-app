import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
// ionic4-datepicker
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { HeaderComponent } from '@app/components/header/header.component';
import { CalenderPopoverComponent } from './calender-popover/calender-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    CalendarPageRoutingModule,
    Ionic4DatepickerModule
  ],
  declarations: [CalendarPage, HeaderComponent, CalenderPopoverComponent],
  entryComponents: [CalenderPopoverComponent]
})
export class CalendarPageModule {}
