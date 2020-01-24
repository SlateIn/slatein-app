import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityPasswordPageRoutingModule } from './security-password-routing.module';

import { SecurityPasswordPage } from './security-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SecurityPasswordPage]
})
export class SecurityPasswordPageModule {}
