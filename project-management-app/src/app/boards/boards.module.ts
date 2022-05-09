import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards/boards.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { NewBoardComponent } from './new-board/new-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatingModule } from '../shared/translating/translating.module';
import { BoardPreviewComponent } from './board-preview/board-preview.component';
import { CurrentBoardComponent } from './current-board/current-board.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { NewColumnComponent } from './new-column/new-column.component';
import { NewTaskComponent } from './new-task/new-task.component';

const routes: Routes = [{ path: '', component: BoardsComponent }];

@NgModule({
  declarations: [BoardsComponent, NewBoardComponent, BoardPreviewComponent, CurrentBoardComponent, EditCardComponent, NewColumnComponent, NewTaskComponent],
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
