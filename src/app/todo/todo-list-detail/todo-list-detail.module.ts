import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoListDetailPageRoutingModule } from './todo-list-detail-routing.module';

import { TodoListDetailPage } from './todo-list-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListDetailPageRoutingModule
  ],
  declarations: [TodoListDetailPage]
})
export class TodoListDetailPageModule {}
