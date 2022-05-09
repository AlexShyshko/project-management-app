import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  isEditEnable: boolean = false;

  title: string = '';

  columnId: string = '';

  dialogRef: MatDialogRef<ConfirmationComponent>;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.board$ = this.boardsService.boards$.pipe(
      map(boards => boards.filter(board => board.id === this.boardId)[0])
    );
  }

  openDialog(boardId: string, columnId: string, task?: Task) {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: `Delete ${task ? 'task' : 'column'}?`,
    });
    this.dialogRef.afterClosed().subscribe((event) => {
      if (event === 'action') {
        task ? this.deleteTask(task) : this.deleteColumn(boardId, columnId);
      }
    });
  }

  public addColumn(boardId: string) {
    this.boardsService.createColumn(boardId);
  }

  public addTask(boardId: string, columnId: string) {
    this.boardsService.createTask(boardId, columnId);
  }

  public deleteColumn(boardId: string, columnId: string) {
    this.boardsService.deleteColumn(boardId, columnId);
  }

  public editColumn(columnId) {
    this.columnId = columnId;
    this.isEditEnable = !this.isEditEnable;
  }

  public submitTitle(boardId: string, column: Column) {
    this.boardsService.editColumnTitle(boardId, column, this.title);
    this.isEditEnable = !this.isEditEnable;
  }

  public deleteTask(task: Task) {
    this.boardsService.deleteTask(task);
  }
}
