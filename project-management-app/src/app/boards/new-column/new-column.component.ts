import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-new-column',
  templateUrl: './new-column.component.html',
  styleUrls: ['./new-column.component.scss'],
})
export class NewColumnComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  public subscriptions: Subscription[] = [];

  constructor(
    private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public translate: TranslateService,
    public coreService: CoreService,
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

  submit() {
    if (this.form.valid) {
      this.boardsService.createColumn(this.data, this.form.get('title')?.value);
    }
  }
}
