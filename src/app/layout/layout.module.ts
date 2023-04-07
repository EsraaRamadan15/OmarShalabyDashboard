import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [LayoutComponent, ToolbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    CoreModule,
    MatSnackBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class LayoutModule {}
