import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';

const routes: Routes = [{ path: '', component: BoardsComponent }];

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsModule {}

