import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(55)]),
  });

  constructor(private boardsService: BoardsService,  @Inject(MAT_DIALOG_DATA) public data: { boardId: string, task: Task, columnId: string }) { }

  ngOnInit(): void {
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
