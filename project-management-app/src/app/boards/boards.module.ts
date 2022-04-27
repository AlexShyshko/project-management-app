import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { NewBoardComponent } from './new-board/new-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: BoardsComponent }];

@NgModule({
  declarations: [BoardsComponent, NewBoardComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes), ReactiveFormsModule,
    FormsModule],
  exports: [BoardsComponent, RouterModule],
})
export class BoardsModule {}
