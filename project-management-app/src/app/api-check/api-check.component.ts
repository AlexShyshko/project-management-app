import { Component } from '@angular/core';
import { ApiService } from '../apis/api';

@Component({
  selector: 'app-api-check',
  templateUrl: './api-check.component.html',
  styleUrls: ['./api-check.component.scss']
})
export class ApiCheckComponent {
  private token = '';

  constructor(private apiService: ApiService) { }

  public signup() {
    const user = {
      name: 'test2',
      login: 'test2',
      password: 'test2',
    };
    this.apiService.authenticate(user, 'signup').subscribe(res => console.log('signup', res.id));
  }

  public signin() {
    const user = {
      login: 'test1',
      password: 'test1',
    };
    this.apiService.authenticate(user, 'signin').subscribe(res => {
      if (!res.token) return;
      this.token = res.token
    });
  }

  public getUsers() {
    this.apiService.getUsers(this.token).subscribe((res) => {console.log('get', res[0])});
  }
}
