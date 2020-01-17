import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';

import { PersonalInformationPage } from './personal-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationPageRoutingModule
  ],
  declarations: [PersonalInformationPage],
  providers:[DatePipe]
})
export class PersonalInformationPageModule {}
