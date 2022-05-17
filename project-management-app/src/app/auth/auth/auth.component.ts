import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { StorageService } from 'src/app/core/services/storage.service';
import { User } from 'src/app/models/user.model';
import { CustomValidator } from 'src/app/shared/services/customValidator';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../core/services/core.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  hide = true;

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomValidator.upperCaseValidator,
      CustomValidator.lowerCaseValidator,
      CustomValidator.numbersValidator,
      CustomValidator.symbolsValidator,
    ]),
  });

  public subscriptions: Subscription[] = [];

  constructor(
    public apiService: ApiService,
    private router: Router,
    private storageService: StorageService,
    public translate: TranslateService,
    public coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  submit(login: string, password: string): void {
    const user: User = {
      login,
      password,
    };
    this.apiService.authenticate(user, 'signin').subscribe((resIn) => {
      if (!resIn.token) return;
      this.storageService.setItem('token', resIn.token);
      this.apiService.getUsers(resIn.token).subscribe((resUsers) => {
        const foundUser = resUsers.filter((item) => item.login === login)[0];
        this.storageService.setItem('user', JSON.stringify(foundUser));
      });
      if (this.form.valid && this.storageService.isLogged()) {
        this.router.navigate(['/main']);
      }
    });
  }
}
