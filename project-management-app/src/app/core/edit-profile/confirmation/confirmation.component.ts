import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../services/core.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    private storageService: StorageService,
    private router: Router,
    public translate: TranslateService,
    public coreService: CoreService,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteUser() {
    // this.apiService.deleteUser();
    this.storageService.logout();
    this.router.navigate(['/']);
  }

  saveMessage() {
    this.dialogRef.close('action');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
