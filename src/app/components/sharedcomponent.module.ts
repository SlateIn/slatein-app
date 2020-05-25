import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDisplayComponent } from './task-display/task-display.component';
import { TodoDisplayComponent } from './todo-display/todo-display.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    TaskDisplayComponent,
    TodoDisplayComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TaskDisplayComponent,
    TodoDisplayComponent,
    HeaderComponent
  ]
})
export class SharedcomponentModule { }
