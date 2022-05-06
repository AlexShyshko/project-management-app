import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { ApiService } from './api';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  private boards = new BehaviorSubject<Board[]>([]);

  private boardsArray: Board[];

  boards$ = this.boards.asObservable();

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
        console.log(boards);
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

}
