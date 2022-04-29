import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidator {
  static upperCaseValidator(control: FormControl): { [key: string]: { [key: string]: string } } | null {
    let value: string = control.value || '';
    if ((/[A-Z]+/g).test(value)) {
      return null;
    } else {
      return { upperCase: { message: '- at least one uppercase letter' } };
    }
  }

  static lowerCaseValidator(control: FormControl): { [key: string]: { [key: string]: string } } | null {
    let value: string = control.value || '';
    if ((/[a-z]+/g).test(value)) {
      return null;
    } else {
      return { lowerCase: { message: '- at least one lowercase letter' } };
    }
  }

  static numbersValidator(control: FormControl): { [key: string]: { [key: string]: string } } | null {
    let value: string = control.value || '';
    if ((/\d/).test(value)) {
      return null;
    } else {
      return { numbers: { message: '- at least one number' } };
    }
  }

  static symbolsValidator(control: FormControl): { [key: string]: { [key: string]: string } } | null {
    let value: string = control.value || '';
    if ((/[\]!@#$%^&*,?]/).test(value)) {
      return null;
    } else {
      return { symbols: { message: '- at least one special symbol (!@#$%^&*,?])' } };
    }
  }

  static urlValidator(control: FormControl): { [key: string]: { [key: string]: string } } | null {
    let value: string = control.value || '';
    if ((/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm).test(value)) {
      return null;
    } else {
      return { url: { message: 'Link is invalid' } };
    }
  }

  static passwordValidator(control: AbstractControl) {
    let password = control.get('password')!.value;
    if (control?.get('confirmPassword')!.touched || control?.get('confirmPassword')!.dirty) {
      let verifyPassword = control.get('confirmPassword')!.value;
      if (password != verifyPassword) {
        return control.get('confirmPassword')!.setErrors( { MatchPassword: true } );
      } else {
        return null;
      }
    }
  }

}
