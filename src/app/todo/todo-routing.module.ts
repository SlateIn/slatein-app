import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoPage } from './todo.page';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
  },
  {
    path: 'view',
    loadChildren: () => import('./todo-view/todo-view.module').then( m => m.TodoViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
