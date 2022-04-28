import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { StorageService } from 'src/app/core/services/storage.service';
import { User } from 'src/app/models/user.model';
import { CustomValidator } from 'src/app/shared/services/customValidator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  hide = true;

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomValidator.upperCaseValidator,
      CustomValidator.lowerCaseValidator,
      CustomValidator.numbersValidator,
      CustomValidator.symbolsValidator,
    ]),
  });

  constructor(
    public apiService: ApiService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {}

  submit(login: string, password: string): void {
    const user: User = {
      login,
      password,
    };
    this.apiService.authenticate(user, 'signin').subscribe(res => {
      this.storageService.setItem('token', res.token);
      this.apiService.getUsers(res.token as string).subscribe(gres => {
        const id = gres.filter(item => item.login === login)[0].id;
        this.storageService.setItem('userId', id);
      });
    });

    if (this.form.valid) {
      this.router.navigate(['/main']);
    }
  }
}
