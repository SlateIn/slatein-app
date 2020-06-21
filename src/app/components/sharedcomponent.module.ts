import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDisplayComponent } from './todo-display/todo-display.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    TodoDisplayComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TodoDisplayComponent,
    HeaderComponent
  ]
})
export class SharedcomponentModule { }
