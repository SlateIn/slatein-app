import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydayPageRoutingModule } from './myday-routing.module';

import { MydayPage } from './myday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydayPageRoutingModule
  ],
  declarations: [MydayPage]
})
export class MydayPageModule {}
