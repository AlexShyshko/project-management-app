import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private lang = new BehaviorSubject<string>('en');

  public currentLang = this.lang.asObservable();

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
  }

  translateLanguageTo(lang: string) {
    this.translate.use(lang);
    this.lang.next(lang);
  }

  getCustomValidatorKey(message: string): string {
    switch (message) {
      case '- at least one lowercase letter':
        return 'core.edit-profile.lower-case';
      case '- at least one number':
        return 'core.edit-profile.numbers';
      case '- at least one special symbol (!@#$%^&*,?])':
        return 'core.edit-profile.symbols';
      case '- at least one uppercase letter':
        return 'core.edit-profile.upper-case';
      case undefined:
        return '';
      default:
        return '';
    }
  }
}
