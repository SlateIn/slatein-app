import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'myday',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myday/myday.module').then(m => m.MydayPageModule)
          }
        ]
      },
      
      {
        path: 'planner',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../planner/planner.module').then(m => m.PlannerPageModule)
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../calendar/calendar.module').then(m => m.CalendarPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/myday',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/myday',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
