import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {  } from './header.component';

const components = [];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: components,
  exports: components
})
export class ComponentsModule {}
