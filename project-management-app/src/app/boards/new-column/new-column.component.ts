import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from 'src/app/core/services/boards.service';

@Component({
  selector: 'app-new-column',
  templateUrl: './new-column.component.html',
  styleUrls: ['./new-column.component.scss'],
})
export class NewColumnComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(private boardsService: BoardsService,  @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.boardsService.createColumn(this.data, this.form.get('title')?.value);
    }
  }

}
