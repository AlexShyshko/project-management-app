import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent implements OnInit {

  data: string = 'Are you sure to delete board?';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: this.data,
    });
  }

}
