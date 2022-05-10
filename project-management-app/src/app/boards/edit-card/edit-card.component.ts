import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(55)]),
  });

  public subscriptions: Subscription[] = [];

  constructor(
    private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; task: Task; columnId: string },
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
      this.boardsService.editTask({
        boardId: this.data.boardId,
        id: this.data.task.id!,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        columnId: this.data.columnId,
        order: this.data.task.order,
      });
    }
  }
}
