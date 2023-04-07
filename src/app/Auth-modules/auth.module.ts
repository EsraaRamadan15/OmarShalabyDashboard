import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialsModule } from '../shared/material.mudule';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from '../shared/loading/loading.component';
@NgModule({
  declarations: [LoginComponent, LoadingComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthModule {}
