import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { NewBoardComponent } from './new-board/new-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatingModule } from '../shared/translating/translating.module';
import { BoardPreviewComponent } from './board-preview/board-preview.component';

const routes: Routes = [{ path: '', component: BoardsComponent }];

@NgModule({
  declarations: [BoardsComponent, NewBoardComponent, BoardPreviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TranslatingModule,
  ],
  exports: [BoardsComponent, RouterModule, TranslatingModule],
})
export class BoardsModule {}
