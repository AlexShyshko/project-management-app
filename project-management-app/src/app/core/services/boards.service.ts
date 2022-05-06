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
    this.apiService.getBoards(this.storageService.getToken()!)
      .subscribe(collection => {
        this.boardsArray = collection;
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
