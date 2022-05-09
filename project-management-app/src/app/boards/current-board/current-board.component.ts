import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Board } from 'src/app/models/board.model';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { NewColumnComponent } from '../new-column/new-column.component';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent implements OnInit {
  boardId: string;

  board$: Observable<Board>;

  backgroundImage: string = '';

  images: string[] = [
    '../../../assets/current-board/background1.png',
    '../../../assets/current-board/background2.png',
    '../../../assets/current-board/background3.png',
    '../../../assets/current-board/background4.png'
  ];

  isTitleClicked = false;

  dialogRef: MatDialogRef<ConfirmationComponent>;

  data = 'Are you sure to delete this column?';

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params.id;
    this.board$ = this.boardsService.boards$.pipe(
      map(boards => boards.filter(board => board.id === this.boardId)[0])
    );
    let ran = Math.round((Math.random()*100)%3);
    this.backgroundImage = this.images[ran];
  }

  toggleColumnTitle() {
    this.isTitleClicked = !this.isTitleClicked;
  }

  openModalEditTask() {
    this.dialog.open(EditCardComponent, { panelClass: 'custom-dialog-container' });
  }

  openModalCreateColumn() {
    this.dialog.open(NewColumnComponent, { panelClass: 'custom-dialog-container' });
  }

  openModalCreateTask() {
    this.dialog.open(NewTaskComponent, { panelClass: 'custom-dialog-container' });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: this.data,
    });
  }
}
