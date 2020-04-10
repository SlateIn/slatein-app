import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoViewPageRoutingModule } from './todo-view-routing.module';

import { TodoViewPage } from './todo-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TodoViewPageRoutingModule
  ],
  declarations: [TodoViewPage]
})
export class TodoViewPageModule {}
