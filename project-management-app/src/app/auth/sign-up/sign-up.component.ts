import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api';
import { CoreService } from 'src/app/core/services/core.service';
import { User } from 'src/app/models/user.model';
import { CustomValidator } from 'src/app/shared/services/customValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  hide = true;

  form: FormGroup;

  public subscriptions: Subscription[] = [];

  constructor(
    public apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        login: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          CustomValidator.upperCaseValidator,
          CustomValidator.lowerCaseValidator,
          CustomValidator.numbersValidator,
          CustomValidator.symbolsValidator,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: CustomValidator.passwordValidator,
      },
    );
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  submit(name: string, login: string, password: string) {
    const user: User = {
      name,
      login,
      password,
    };
    this.apiService.authenticate(user, 'signup').subscribe((res) => console.log(res));
    if (this.form.valid) {
      this.router.navigate(['/main']);
    }
  }
}
