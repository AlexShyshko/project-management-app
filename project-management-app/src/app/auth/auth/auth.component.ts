import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { CustomValidator } from 'src/app/shared/services/customValidator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  hide = true;

  form: FormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomValidator.upperCaseValidator,
      CustomValidator.lowerCaseValidator,
      CustomValidator.numbersValidator,
      CustomValidator.symbolsValidator,
    ]),
  });

  constructor(public authService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.router.navigate(['/boards']);
    }
  }

}
