import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  isEditEnable: boolean = false;

  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.board$ = this.boardsService.boards$.pipe(
      map(boards => boards.filter(board => board.id === this.boardId)[0])
    );
  }

  public addColumn(boardId: string) {
    this.boardsService.createColumn(boardId);
  }

  public addTask(boardId: string, columnId: string) {
    this.boardsService.createTask(boardId, columnId);
  }

  public deleteColumn(boardId: string, columnId: string) {
    this.boardsService.deleteColumn(boardId, columnId);
  }

  editColumn() {
    this.isEditEnable = !this.isEditEnable;
  }

  submitTitle(boardId: string, column: Column) {
    this.boardsService.editColumnTitle(boardId, column, this.title);
    this.isEditEnable = !this.isEditEnable;
  }
}
