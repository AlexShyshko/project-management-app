import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api';
import { StorageService } from 'src/app/core/services/storage.service';
import { Board } from 'src/app/models/board.model';
import { selectBoards } from 'src/app/redux/selectors';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.board$ = this.store.select(selectBoards).pipe(
      map(boards => boards.filter(board => board.id === this.boardId)[0])
    );
  }

  public goToMainPage(): void {
    this.router.navigateByUrl('/main');
  }
}
