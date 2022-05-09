import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { NewColumnComponent } from '../new-column/new-column.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  backgroundImage: string = '';

  images: string[] = [
    '../../../assets/current-board/background1.png',
    '../../../assets/current-board/background2.png',
    '../../../assets/current-board/background3.png',
    '../../../assets/current-board/background4.png'
  ];

  isTitleClicked = false;

  dialogRef: MatDialogRef<ConfirmationComponent>;

  data = 'Are you sure to delete this column?';

  isEditEnable: boolean = false;

  title: string = '';

  columnId: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.boardsService.updateCurrentBoard(this.boardId);
    this.board$ = this.boardsService.board$;
    let ran = Math.round((Math.random()*100)%3);
    this.backgroundImage = this.images[ran];
  }

  toggleColumnTitle() {
    this.isTitleClicked = !this.isTitleClicked;
  }

  openModalEditTask() {
    this.dialog.open(EditCardComponent, { panelClass: 'custom-dialog-container' });
  }

  openModalCreateColumn(boardId: string) {
    const modal = this.dialog.open(NewColumnComponent, { panelClass: 'custom-dialog-container', data: boardId });
    // modal.afterClosed().subscribe((event) => {
    //   if (event === 'action') {
    //     this.addColumn(boardId);
    //   }
    // });
  }

  openModalCreateTask() {
    this.dialog.open(NewTaskComponent, { panelClass: 'custom-dialog-container' });
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
