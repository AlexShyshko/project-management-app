import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  constructor(private apiService: ApiService, private router: Router) {}
  headerSticky: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.headerSticky = window.scrollY > 50;
  }

  public signup() {
    const user = {
      name: 'test123',
      login: 'test123',
      password: 'test123',
    };
    this.apiService.authenticate(user, 'signup').subscribe(res => console.log('userId', res.id));
    this.router.navigate(['/signup']);
  }

  public signin() {
    const user = {
      login: 'test1',
      password: 'test1',
    };
    this.apiService.authenticate(user, 'signin').subscribe(res => console.log('token', res.token));
    this.router.navigate(['/auth']);
  }



}
