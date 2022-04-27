import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{ path: '', component: SignUpComponent }];

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes), ReactiveFormsModule,
    FormsModule],
  exports: [RouterModule],
})
export class SignUpModule {}
