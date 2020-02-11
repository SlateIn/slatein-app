import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydayPage } from './myday.page';

const routes: Routes = [
  {
    path: '',
    component: MydayPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydayPageRoutingModule {}
