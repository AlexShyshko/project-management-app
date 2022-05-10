import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Column } from 'src/app/models/column.model';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(55)]),
  });

  public subscriptions: Subscription[] = [];

  constructor(
    private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string, column: Column },
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
      this.boardsService.createTask(
        this.data.boardId,
        this.data.columnId,
        this.form.get('title')?.value,
        this.form.get('description')?.value,
        this.data.column,
      );
    }
  }
}
