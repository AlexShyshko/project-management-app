import { Component } from '@angular/core';
import { ApiService } from '../apis/api';

@Component({
  selector: 'app-api-check',
  templateUrl: './api-check.component.html',
  styleUrls: ['./api-check.component.scss']
})
export class ApiCheckComponent {

  constructor(private apiService: ApiService) { }

  public signup() {
    const user = {
      name: 'test1',
      login: 'test1',
      password: 'test1',
    };
    this.apiService.signup(user).subscribe(res => console.log('signup', res));
  }

  public signin() {
    const user = {
      login: 'test1',
      password: 'test1',
    };
    this.apiService.signin(user).subscribe(res => console.log('signin', res));
  }
}
