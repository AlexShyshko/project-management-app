import { Component, OnChanges, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { ApiService } from 'src/app/core/services/api';
import { BoardsService } from 'src/app/core/services/boards.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent implements OnInit {

  data: string = 'Are you sure to delete board?';

  boards$: Observable<Board[]>;

  dialogRef: MatDialogRef<ConfirmationComponent>;

  constructor(private dialog: MatDialog, private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.boardsService.updateBoards();
    this.boards$ = this.boardsService.boards$;
  }

  openDialog(id: string) {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: this.data,
    })
    this.dialogRef.afterClosed().subscribe(event => {
      if (event === 'action') {
        this.boardsService.removeBoard(id);
      }
    })
  }

}
