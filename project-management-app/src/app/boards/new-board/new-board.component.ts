import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../core/services/core.service';
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
  ) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.router.navigate(['/main']);
      this.apiService
        .createBoard('', { title: this.form.get('title')?.value })
        .subscribe((res) => console.log('board', res.title));
    }
  }
}
