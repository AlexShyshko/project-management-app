import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../core/services/core.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Store } from '@ngrx/store';
import { GetBoards } from 'src/app/redux/actions';
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
    private apiService: ApiService,
    public translate: TranslateService,
    public coreService: CoreService,
    private storageService: StorageService,
    private store: Store,
  ) {}

  ngOnInit(): void {}

  submit() {
    const token = this.storageService.getToken();
    if (!token) return;
    if (this.form.valid) {
      this.router.navigate(['/main']);
      this.apiService
        .createBoard(token, { title: this.form.get('title')?.value }).subscribe(() => this.store.dispatch(new GetBoards(token)));
    }
  }
}
