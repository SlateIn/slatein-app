import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedcomponentModule } from '@app/components/sharedcomponent.module';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule, SharedcomponentModule],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
