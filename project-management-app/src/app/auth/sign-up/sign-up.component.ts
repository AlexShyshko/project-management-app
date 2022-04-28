import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api';
import { CustomValidator } from 'src/app/shared/services/customValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hide = true;

  form: FormGroup;

  constructor(public authService: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.upperCaseValidator,
        CustomValidator.lowerCaseValidator,
        CustomValidator.numbersValidator,
        CustomValidator.symbolsValidator,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    }, {
      validator: CustomValidator.passwordValidator,
    });
  }


  submit() {
    if (this.form.valid) {
      this.router.navigate(['/boards']);
    }
  }

}
