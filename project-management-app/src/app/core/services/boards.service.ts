import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  constructor(private apiService: ApiService, private storageService: StorageService) { }

  updateBoards() {
    const token = this.storageService.getToken()!;
    this.apiService.getBoards(token)
      .subscribe(collection => {
        const boards = collection.map(board => {
          this.apiService.getColumns(token, board.id!).subscribe(columnsResponse => {
            const columns = columnsResponse.map(column => {
              this.apiService.getTasks(token, board.id, column.id).subscribe(taskResponse => column.tasks = taskResponse);
              return column;
            });
            board.columns = columns;
          });
          return board;
        });
        this.boardsArray = boards;
        this.boards.next(this.boardsArray);
      });
  }

  addBoard(board: Board) {
    this.apiService.createBoard(this.storageService.getToken()!, board)
      .subscribe(element => {
        this.boardsArray.push(element);
        this.boards.next(this.boardsArray);
      });
  }

  removeBoard(id: string) {
    this.apiService.deleteBoard(this.storageService.getToken()!, id)
      .subscribe(() => {
        const boardIndex = this.boardsArray.findIndex(el => el.id === id);
        this.boardsArray.splice(boardIndex, 1);
        this.boards.next(this.boardsArray);
      });
  }

  updateCurrentBoard(boardId: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getBoardById(token, boardId)
      .subscribe(board => {
        this.apiService.getColumns(token, board.id!).subscribe(columnsResponse => {
          const columns = columnsResponse.map(column => {
            this.apiService.getTasks(token, board.id, column.id).subscribe(taskResponse => column.tasks = taskResponse);
            return column;
          });
          board.columns = columns;
        });
        this.board.next(board);
      });
  }

  createColumn(boardId: string, title: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getColumns(token, boardId).subscribe(res => {
      const orders = res.map(column => column.order);
      const order = orders.length !== Math.max(...orders)
        ? res.findIndex((column, index) => column.order !== index + 1) + 1
        : res.length + 1;
      this.apiService.createColumn(token, boardId, { title: title, order: order === 0 ? order + 1 : order }).subscribe(() => {
        this.updateCurrentBoard(boardId);
      });
    });
  }

  deleteColumn(boardId: string, columnId: string) {
    const token = this.storageService.getToken()!;
    this.apiService.getColumnById(token, boardId, columnId).subscribe(res => {
      res.tasks.forEach(task => this.deleteTask(task));
      this.apiService.deleteColumn(token, boardId, columnId).subscribe(() => this.updateCurrentBoard(boardId));
    });
  }

  createTask(boardId: string, columnId: string, title: string, description: string, column: Column) {
    const token = this.storageService.getToken()!;
    const userId = this.storageService.getUserId()!;
    const orders = column.tasks.map(task => task.order);
    const order = orders.length !== Math.max(...orders)
      ? column.tasks.findIndex((task, index) => task.order !== index + 1) + 1
      : column.tasks.length + 1;
    this.apiService.createTask(token, boardId, columnId, { title, order: order === 0 ? order + 1 : order, description, userId }).subscribe(() => {
      this.updateCurrentBoard(boardId);
    });
  }

  editColumnTitle(boardId: string, column: Column, title: string) {
    const token = this.storageService.getToken()!;
    this.apiService.updateColumn(token, boardId, column.id, { title, order: column.order }).subscribe(() => {
      this.updateCurrentBoard(boardId);
    });
  }

  deleteTask(task: Task) {
    const token = this.storageService.getToken()!;
    this.apiService.deleteTask(token, task.boardId, task.columnId, task.id).subscribe(() => this.updateCurrentBoard(task.boardId));
  }

  editTask(
    { boardId, id, title, description, columnId, order }: { boardId: string, id: string, title: string, description: string, columnId: string, order: number },
  ) {
    const token = this.storageService.getToken()!;
    const userId = this.storageService.getUserId()!;
    this.apiService.updateTask(token, id, { columnId, title, description, order, userId, boardId }).subscribe(() => {
      this.updateCurrentBoard(boardId);
    });
  }
}
