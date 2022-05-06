import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../core/services/core.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { BoardsService } from 'src/app/core/services/boards.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    public translate: TranslateService,
    public coreService: CoreService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {}

  submit() {
    const token = this.storageService.getToken();
    if (!token) return;
    if (this.form.valid) {
      this.router.navigate(['/main']);
      this.boardsService
        .addBoard({ title: this.form.get('title')?.value });
    }
  }
}
