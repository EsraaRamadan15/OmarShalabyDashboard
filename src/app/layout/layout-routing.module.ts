import { SurahViewComponent } from './../core/Surah/surah-view/surah-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AddDoaaComponent } from '../core/Doaa/add-doaa/add-doaa.component';
import { AddSurahComponent } from '../core/Surah/add-surah/add-surah.component';
import { DashboardComponent } from '../core/dashboard/dashboard.component';
import { SurahsListComponent } from '../core/Surah/surah-list/surah-list.component';
import { DoaaListComponent } from '../core/Doaa/doaa-list/doaa-list.component';

const all_routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'surah',
    component: SurahViewComponent
  },
  {
    path: 'add-surah',
    component: AddSurahComponent,
  },
  {
    path: 'edit-surah/:id',
    component: AddSurahComponent,
  },
  {

    path: 'surahs-list',
    component: SurahsListComponent,
  },

  {
    path: 'add-doaa',
    component: AddDoaaComponent,
  },

  {
    path: 'edit-doaa/:id',
    component: AddDoaaComponent,
  },
  {

    path: 'doaa-list',
    component: DoaaListComponent,
  }
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
export class LayoutRoutingModule { }
