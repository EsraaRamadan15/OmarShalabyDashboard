import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmbedViedoComponent } from '../shared/embed-viedo/embed-viedo.component';
import { SafePipe } from '../shared/pipes/safe.pipe';
import { MaterialsModule } from '../shared/material.mudule';
import { AuthModule } from '../Auth-modules/auth.module';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxPaginationModule } from 'ngx-pagination';
import { AddDoaaComponent } from './Doaa/add-doaa/add-doaa.component';
import { AddSurahComponent } from './Surah/add-surah/add-surah.component';
import { SurahViewComponent } from './Surah/surah-view/surah-view.component';
import { SurahsListComponent } from './Surah/surah-list/surah-list.component';
import { DoaaListComponent } from './Doaa/doaa-list/doaa-list.component';
@NgModule({
  declarations: [
    DashboardComponent,
    EmbedViedoComponent,
    AddSurahComponent,
    SafePipe,
    AddDoaaComponent,
    SurahViewComponent,
    SurahsListComponent,
    DoaaListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    AuthModule,
    MatTabsModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CoreModule {}
