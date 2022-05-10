import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from 'src/app/core/services/boards.service';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(55)]),
  });

  constructor(private boardsService: BoardsService,  @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string, column: Column }) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.boardsService.createTask(this.data.boardId, this.data.columnId, this.form.get('title')?.value, this.form.get('description')?.value, this.data.column);
    }
  }

}
