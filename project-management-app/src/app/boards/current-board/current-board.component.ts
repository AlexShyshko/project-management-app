import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { NewColumnComponent } from '../new-column/new-column.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { Task } from 'src/app/models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss'],
})
export class CurrentBoardComponent implements OnInit, OnDestroy {
  boardId: string;

  board$: Observable<Board>;

  backgroundImage: string = '';

  images: string[] = [
    '../../../assets/current-board/background1.png',
    '../../../assets/current-board/background2.png',
    '../../../assets/current-board/background3.png',
    '../../../assets/current-board/background4.png',
  ];

  dialogRef: MatDialogRef<ConfirmationComponent>;

  isEditEnable: boolean = false;

  title: string = '';

  columnId: string = '';

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
    let ran = Math.round((Math.random() * 100) % 3);
    this.backgroundImage = this.images[ran];
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

  openModalEditTask(boardId: string, task: Task, columnId: string) {
    this.dialog.open(EditCardComponent, {
      panelClass: 'custom-dialog-container',
      data: { boardId: boardId, task: task, columnId },
    });
  }

  openModalCreateColumn(boardId: string) {
    this.dialog.open(NewColumnComponent, { panelClass: 'custom-dialog-container', data: boardId });
  }

  openModalCreateTask(boardId: string, columnId: string, column: Column) {
    this.dialog.open(NewTaskComponent, {
      panelClass: 'custom-dialog-container',
      data: { boardId: boardId, columnId: columnId, column: column },
    });
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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
