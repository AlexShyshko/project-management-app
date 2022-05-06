import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetBoards } from 'src/app/redux/actions';
import { ApiService } from './api';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private store: Store,
  ) { }

  updateBoards() {
    const token = this.storageService.getToken();
    this.store.dispatch(new GetBoards(token!));
  }

  removeBoard(id: string) {
    const token = this.storageService.getToken();
    this.apiService.deleteBoard(token!, id).subscribe(() => this.store.dispatch(new GetBoards(token!)))
  }
}
