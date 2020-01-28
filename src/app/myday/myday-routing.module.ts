import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydayPage } from './myday.page';

const routes: Routes = [
  {
    path: '',
    component: MydayPage
  },
  {
    path: 'new-task',
    loadChildren: () => import('./new-task/new-task.module').then( m => m.NewTaskPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydayPageRoutingModule {}
