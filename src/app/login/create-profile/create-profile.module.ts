import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@app/components/header';
import { CreateProfilePageRoutingModule } from './create-profile-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ComponentsModule, CreateProfilePageRoutingModule
  ]
})
export class CreateProfileModule { }
