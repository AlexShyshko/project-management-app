import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.board$ = this.boardsService.boards$.pipe(
      map(boards => boards.filter(board => board.id === this.boardId)[0])
    );;
  }
}
