import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalenderComponent } from './calender.component';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: '', component: CalenderComponent }])
  ],
  declarations: [CalenderComponent]
})
export class CalenderModule {}
