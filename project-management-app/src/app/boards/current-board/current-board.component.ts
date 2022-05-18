import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from, concatMap } from 'rxjs';
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
import { ApiService } from 'src/app/core/services/api';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss'],
})
export class CurrentBoardComponent implements OnInit, OnDestroy, OnChanges {
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

  isDone = false;

  currentUserId: string;

  public dragSubscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog,
    public translate: TranslateService,
    public coreService: CoreService,
    public api: ApiService,
    public storage: StorageService,
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
    this.currentUserId = this.storage.getUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges() {
    this.dragSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
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
    this.subscriptions.push(
      this.dialogRef.afterClosed().subscribe((event) => {
        if (event === 'action') {
          return task ? this.deleteTask(boardId, columnId, task) : this.deleteColumn(boardId, columnId);
        }
      }),
    );
  }

  public deleteColumn(boardId: string, columnId: string) {
    this.boardsService.deleteColumn(boardId, columnId);
  }

  public editColumn(columnId: string) {
    this.columnId = columnId;
    this.isEditEnable = !this.isEditEnable;
  }

  public submitTitle(boardId: string, column: Column) {
    this.boardsService.editColumnTitle(boardId, column, this.title);
    this.isEditEnable = !this.isEditEnable;
  }

  public deleteTask(boardId: string, columnId: string, task: Task) {
    this.boardsService.deleteTask(boardId, columnId, task);
  }

  getConfirmTranslation(): void {
    this.subscriptions.push(
      this.translate
        .get(['boards.current-board.delete-task', 'boards.current-board.delete-column'])
        .subscribe((translations) => {
          this.delTaskTrans = translations['boards.current-board.delete-task'] + ' ?';
          this.delColumnTrans = translations['boards.current-board.delete-column'] + ' ?';
        }),
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    let oldBoard: Board;
    let newBoard: Board;
    this.dragSubscriptions.push(
      this.getOldBoard().subscribe((result) => {
        result.columns.sort(this.boardsService.sort);
        result.columns.forEach((column) => {
          column.tasks.sort(this.boardsService.sort);
        });
        oldBoard = result;
        this.updateAllDragNDroppedTasks(oldBoard, newBoard);
      }),
      this.board$.subscribe((result) => {
        newBoard = result;
      }),
    );
  }

  getOldBoard() {
    return this.api.getBoardById(this.storage.getToken(), this.boardId);
  }

  updateAllDragNDroppedTasks(oldBoard: Board, newBoard: Board) {
    let differentTasks: Array<[Task, Task]> = [];
    newBoard.columns.forEach((newColumn, newColumnIndex) => {
      newColumn.tasks.forEach((newTask, newTaskIndex) => {
        const isTask = Boolean(oldBoard.columns[newColumnIndex].tasks[newTaskIndex]);
        let isSameId: boolean;
        if (isTask) {
          isSameId = newTask.id === oldBoard.columns[newColumnIndex].tasks[newTaskIndex].id;
        } else {
          isSameId = false;
        }
        if (!isTask || !isSameId) {
          oldBoard.columns.forEach((oldColumn) => {
            oldColumn.tasks.forEach((oldTask) => {
              if (newTask.id === oldTask.id) {
                const oldPushing: Task = {
                  id: oldTask.id,
                  title: oldTask.title,
                  done: oldTask.done,
                  order: oldTask.order,
                  description: oldTask.description,
                  userId: oldTask.userId,
                  boardId: this.boardId,
                  columnId: oldColumn.id,
                };
                const newPushing: Task = {
                  title: newTask.title,
                  done: newTask.done,
                  order: newTaskIndex + 1,
                  description: newTask.description,
                  userId: newTask.userId,
                  boardId: this.boardId,
                  columnId: newColumn.id,
                };
                differentTasks.push([oldPushing, newPushing]);
              }
            });
          });
        }
      });
    });
    if (differentTasks.length !== 0) {
      const observableLength = differentTasks.length;
      let index = 0;
      const srcObservable = from(differentTasks);
      srcObservable.pipe(concatMap((task) => this.updateTask(task))).subscribe((result) => {
        index++;
        if (index === observableLength) {
          this.boardsService.updateCurrentBoard(this.boardId);
          this.deleteDragSubscriptions();
        }
      });
    } else {
      this.deleteDragSubscriptions();
    }
  }

  updateTask(task: [Task, Task]) {
    return this.api.updateCertainTask(this.storage.getToken(), task[0], task[1]);
  }

  deleteDragSubscriptions(): void {
    this.dragSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.dragSubscriptions = [];
  }

  toggleTaskStatus(boardId: string, task: Task, columnId: string) {
    this.boardsService.editTask({ ...task, id: task.id, boardId, columnId });
  }

  dropColumns(event: CdkDragDrop<Column[]>) {
    if (event.currentIndex === event.previousIndex) return;
    let board;
    let array = this.board$.subscribe((b) => (board = b));
    moveItemInArray(board.columns, event.previousIndex, event.currentIndex);
    const previousColumn = board.columns[event.previousIndex];
    const currentColumn = board.columns[event.currentIndex];
    this.boardsService.updateColumn({
      boardId: board.id,
      numberOfColumns: Math.max(...board.columns.map((c) => c.order)),
      previousColumnId: previousColumn.id,
      currentColumnId: currentColumn.id,
      previousColumn: { title: previousColumn.title, order: currentColumn.order },
      currentColumn: { title: currentColumn.title, order: previousColumn.order },
    });
    this.subscriptions.push(array);
  }

  boardColumnsIds(board: Board) {
    return board.columns.map((e) => e.id);
  }
}
