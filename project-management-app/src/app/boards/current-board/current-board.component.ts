import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss'],
})
export class CurrentBoardComponent implements OnInit, OnDestroy {
  boardId: string;

  board$: Observable<Board>;

  isEditEnable: boolean = false;

  title: string = '';

  columnId: string = '';

  dialogRef: MatDialogRef<ConfirmationComponent>;

  delTaskTrans: string;

  delColumnTrans: string;

  public subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog,
    public translate: TranslateService,
    public coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.boardsService.updateCurrentBoard(this.boardId);
    this.board$ = this.boardsService.board$;
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
        this.getConfirmTranslation();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openDialog(boardId: string, columnId: string, task?: Task) {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: task ? this.delTaskTrans : this.delColumnTrans,
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

  getConfirmTranslation(): void {
    this.translate
      .get(['boards.current-board.delete-task', 'boards.current-board.delete-column'])
      .subscribe((translations) => {
        this.delTaskTrans = translations['boards.current-board.delete-task'] + ' ?';
        this.delColumnTrans = translations['boards.current-board.delete-column'] + ' ?';
      });
  }
}
