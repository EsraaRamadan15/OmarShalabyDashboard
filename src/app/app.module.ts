import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthModule } from './Auth-modules/auth.module';
import { MaterialsModule } from './shared/material.mudule';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TosterNotifierComponent } from './shared/toster-notifier/toster-notifier.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/interceptor.service';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    MatConfirmDialogComponent,
    TosterNotifierComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    LayoutModule,
    AuthModule,
    CoreModule,
    MaterialsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTabsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
