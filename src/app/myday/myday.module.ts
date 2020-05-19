import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydayPageRoutingModule } from './myday-routing.module';

import { MydayPage } from './myday.page';
import { TaskInfoCardComponent } from './task-info-card/task-info-card.component';
import { TaskDisplayComponent } from '@app/components/task-display/task-display.component';
import { SharedcomponentModule } from '@app/components/sharedcomponent.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, MydayPageRoutingModule, SharedcomponentModule],
  declarations: [MydayPage, TaskInfoCardComponent]
})
export class MydayPageModule {}
