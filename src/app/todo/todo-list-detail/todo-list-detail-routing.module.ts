import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListDetailPage } from './todo-list-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListDetailPageRoutingModule {}
