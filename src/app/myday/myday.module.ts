import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydayPageRoutingModule } from './myday-routing.module';

import { MydayPage } from './myday.page';
import { TaskInfoCardComponent } from './task-info-card/task-info-card.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskDisplayComponent } from './task-display/task-display.component';
import { UpNextInfoCardComponent } from './components/up-next-info-card/up-next-info-card.component';
import { FollowByInfoCardComponent } from './components/follow-by-info-card/follow-by-info-card.component';
import { WeekTimelineComponent } from './components/week-timeline/week-timeline.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, MydayPageRoutingModule],
  declarations: [
    MydayPage,
    TaskInfoCardComponent,
    TaskDisplayComponent,
    NewTaskComponent,
    UpNextInfoCardComponent,
    FollowByInfoCardComponent,
    WeekTimelineComponent
  ]
})
export class MydayPageModule {}
