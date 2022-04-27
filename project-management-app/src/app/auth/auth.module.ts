import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [AuthComponent, RouterModule],
})
export class AuthModule {}
