import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityPasswordPageRoutingModule } from './security-password-routing.module';

import { SecurityPasswordPage } from './security-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityPasswordPageRoutingModule
  ],
  declarations: [SecurityPasswordPage]
})
export class SecurityPasswordPageModule {}
