import { Component, HostListener } from '@angular/core';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  headerSticky: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    window.scrollY > 50 ? this.headerSticky = true : this.headerSticky = false;
  }
  constructor(private apiService: ApiService) {}

  public signup() {
    const user = {
      name: 'test123',
      login: 'test123',
      password: 'test123',
    };
    this.apiService.authenticate(user, 'signup').subscribe(res => console.log('userId', res.id));
  }

  public signin() {
    const user = {
      login: 'test1',
      password: 'test1',
    };
    this.apiService.authenticate(user, 'signin').subscribe(res => console.log('token', res.token));
  }

}
