import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { Board } from 'src/app/models/board.model';
import { GetBoards } from 'src/app/redux/actions';
import { selectBoards } from 'src/app/redux/selectors';
import { CoreService } from '../../core/services/core.service';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<Board[]> = of([]);

  constructor(
    public translate: TranslateService,
    public coreService: CoreService,
    private storageService: StorageService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.boards$ = this.store.select(selectBoards);
  }

  private refresh() {
    const token = this.storageService.getToken();
    if (!token) return;
    this.store.dispatch(new GetBoards(token))
  }
}
