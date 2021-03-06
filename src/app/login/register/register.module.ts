import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ComponentsModule } from '@app/components/header';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RegisterPageRoutingModule, ComponentsModule],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
