import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.router.navigate(['/boards']);
      this.apiService.createBoard('', { title: this.form.get('title')?.value }).subscribe(res => console.log('board', res.title));
    }
  }
}
