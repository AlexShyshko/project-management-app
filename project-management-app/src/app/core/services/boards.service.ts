import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { concatAll } from 'rxjs/operators';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';
import { ApiService } from './api';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private boards = new BehaviorSubject<Board[]>([]);

  private boardsArray: Board[];

  boards$ = this.boards.asObservable();

  private board = new BehaviorSubject<Board>({} as Board);

  board$ = this.board.asObservable();

  tasks$ = new Observable<Task[]>();

  constructor(private apiService: ApiService, private storageService: StorageService) {}

  updateBoards() {
    const token = this.storageService.getToken()!;
    const request = this.apiService.getBoards(token);
    request.subscribe((collection) => {
      this.boardsArray = collection;
      this.boards.next(this.boardsArray);
    });
    return request;
  }

  addBoard(board: Board) {
    this.apiService.createBoard(this.storageService.getToken()!, board).subscribe((element) => {
      this.boardsArray.push(element);
      this.boards.next(this.boardsArray);
    });
  }

  removeBoard(id: string) {
    this.apiService.deleteBoard(this.storageService.getToken()!, id).subscribe(() => {
      const boardIndex = this.boardsArray.findIndex((el) => el.id === id);
      this.boardsArray.splice(boardIndex, 1);
      this.boards.next(this.boardsArray);
    });
  }

  updateCurrentBoard(boardId: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getBoardById(token, boardId).subscribe((board) => {
      board.columns.sort(this.sort);
      board.columns.forEach((column) => {
        column.tasks.sort(this.sort);
      });
      this.board.next(board);
    });
  }

  sort(a: Column | Task, b: Column | Task) {
    return a.order - b.order;
  }

  createColumn(boardId: string, title: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getColumns(token, boardId).subscribe((res) => {
      const orders = res.map((column) => column.order);
      const order =
        orders.length !== Math.max(...orders)
          ? res.findIndex((column, index) => column.order !== index + 1) + 1
          : res.length + 1;
      this.apiService
        .createColumn(token, boardId, { title: title, order: order === 0 ? order + 1 : order })
        .subscribe(() => {
          this.updateCurrentBoard(boardId);
        });
    });
  }

  deleteColumn(boardId: string, columnId: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getColumnById(token, boardId, columnId).subscribe(() => {
      this.apiService.deleteColumn(token, boardId, columnId).subscribe(() => this.updateCurrentBoard(boardId));
    });
  }

  createTask(boardId: string, columnId: string, title: string, description: string, column: Column) {
    const token = this.storageService.getToken()!;
    const userId = this.storageService.getUserId()!;
    const orders = column.tasks.map((task) => task.order);
    const order =
      orders.length !== Math.max(...orders)
        ? column.tasks.findIndex((task, index) => task.order !== index + 1) + 1
        : column.tasks.length + 1;
    this.apiService
      .createTask(token, boardId, columnId, {
        title,
        order: order === 0 ? order + 1 : order,
        done: false,
        description,
        userId,
      })
      .subscribe(() => {
        this.updateCurrentBoard(boardId);
      });
  }

  editColumnTitle(boardId: string, column: Column, title: string) {
    const token = this.storageService.getToken()!;
    this.apiService.updateColumn(token, boardId, column.id, { title, order: column.order }).subscribe(() => {
      this.updateCurrentBoard(boardId);
    });
  }

  deleteTask(boardId: string, columnId: string, task: Task) {
    const token = this.storageService.getToken()!;
    this.apiService.deleteTask(token, boardId, columnId, task.id).subscribe(() => this.updateCurrentBoard(boardId));
  }

  editTask({
    boardId,
    id,
    title,
    description,
    columnId,
    order,
    done,
  }: {
    boardId: string;
    id: string;
    title: string;
    description: string;
    columnId: string;
    order: number;
    done: boolean;
  }) {
    const token = this.storageService.getToken()!;
    const userId = this.storageService.getUserId()!;
    this.apiService
      .updateTask(token, id, { columnId, title, description, order, userId, boardId, done })
      .subscribe(() => {
        this.updateCurrentBoard(boardId);
      });
  }

  getTasksForSearch() {
    const token = this.storageService.getToken()!;
    this.tasks$ = this.apiService.searchTasks(token);
  }

  searchTaskByInput(value: string | number) {
    return this.tasks$.pipe(
      map((tasks) =>
        tasks.filter((task) => {
          switch (typeof value) {
            case 'number':
              return (
                task.order === value ||
                task.title.includes(value.toString()) ||
                task.description.includes(value.toString())
              );
            case 'string':
              return (
                task.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                task.description.toLocaleLowerCase().includes(value.toLocaleLowerCase())
              );
          }
        }),
      ),
    );
  }

  updateColumn({
    boardId,
    previousColumnId,
    currentColumnId,
    previousColumn,
    currentColumn,
    numberOfColumns,
  }: {
    boardId: string;
    previousColumnId: string;
    currentColumnId: string;
    previousColumn: Column;
    currentColumn: Column;
    numberOfColumns: number;
  }) {
    const token = this.storageService.getToken()!;
    const defaultShift = numberOfColumns + 1;
    const updatePreviousTemp = this.apiService.updateColumn(token, boardId, previousColumnId, {
      ...previousColumn,
      order: previousColumn.order + defaultShift,
    });
    const updateNext = this.apiService.updateColumn(token, boardId, currentColumnId, currentColumn);
    const updatePrevious = this.apiService.updateColumn(token, boardId, previousColumnId, previousColumn);
    const pipeOfRequests = of(updatePreviousTemp, updateNext, updatePrevious);
    let pipeOfRequestsLength = 0;
    pipeOfRequests.pipe(concatAll()).subscribe(() => {
      pipeOfRequestsLength++;
      if (pipeOfRequestsLength === 3) {
        this.updateCurrentBoard(boardId);
      }
    });
  }
}
