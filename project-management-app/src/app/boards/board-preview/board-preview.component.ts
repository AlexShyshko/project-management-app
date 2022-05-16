import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationComponent } from 'src/app/core/edit-profile/confirmation/confirmation.component';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit, OnDestroy {
  data!: string;

  boards$: Observable<Board[]>;

  dialogRef: MatDialogRef<ConfirmationComponent>;

  public subscriptions: Subscription[] = [];

  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private boardsService: BoardsService,
    public translate: TranslateService,
    public coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.boardsService.updateBoards().subscribe(() => this.isLoading = false);
    this.boards$ = this.boardsService.boards$;
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
        this.getConfirmTranslation();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openDialog(id: string) {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      panelClass: 'custom-dialog-container',
      data: this.data,
    });
    this.dialogRef.afterClosed().subscribe((event) => {
      if (event === 'action') {
        this.boardsService.removeBoard(id);
      }
    });
  }

  getConfirmTranslation(): void {
    this.translate.get(['boards.board-preview.confirmation']).subscribe((translations) => {
      this.data = translations['boards.board-preview.confirmation'];
    });
  }
}
