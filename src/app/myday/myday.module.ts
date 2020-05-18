import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydayPageRoutingModule } from './myday-routing.module';

import { MydayPage } from './myday.page';
import { TaskInfoCardComponent } from './task-info-card/task-info-card.component';
import { TaskDisplayComponent } from '@app/components/task-display/task-display.component';
import { HeaderComponent } from '@app/components/header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, MydayPageRoutingModule],
  declarations: [MydayPage, TaskInfoCardComponent, TaskDisplayComponent, HeaderComponent]
})
export class MydayPageModule {}
