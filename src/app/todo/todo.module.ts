import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoPageRoutingModule } from './todo-routing.module';

import { TodoPage } from './todo.page';
import { TodoDisplayComponent } from '@app/components/todo-display/todo-display.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { SharedcomponentModule } from '@app/components/sharedcomponent.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TodoPageRoutingModule,
    SharedcomponentModule
  ],
  declarations: [TodoPage],
  entryComponents: []
})
export class TodoPageModule {}
