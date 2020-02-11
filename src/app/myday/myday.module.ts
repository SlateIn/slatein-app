import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydayPageRoutingModule } from './myday-routing.module';

import { MydayPage } from './myday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MydayPageRoutingModule
  ],
  declarations: [MydayPage]
})
export class MydayPageModule {}
