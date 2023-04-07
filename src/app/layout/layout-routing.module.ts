import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AddDoaaComponent } from '../core/Doaa/add-doaa/add-doaa.component';
import { AddSurahComponent } from '../core/Surah/add-surah/add-surah.component';
import { DashboardComponent } from '../core/dashboard/dashboard.component';

const all_routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'add-surah',
    component: AddSurahComponent,
  },
  {
    path: 'edit-surah',
    component: AddSurahComponent,
  },

  {
    path: 'add-doaa',
    component: AddDoaaComponent,
  },

  {
    path: 'edit-doaa',
    component: AddDoaaComponent,
  },
];
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: all_routes,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
