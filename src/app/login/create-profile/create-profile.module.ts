import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@app/components/header';
import { CreateProfilePageRoutingModule } from './create-profile-routing.module';
import { CreateProfileComponent } from './create-profile.component';



@NgModule({
  declarations: [CreateProfileComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, ReactiveFormsModule, ComponentsModule, CreateProfilePageRoutingModule
  ]
})
export class CreateProfileModule { }
