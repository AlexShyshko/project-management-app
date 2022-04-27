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
    this.router.navigate(['/signup']);
  }

  public signin() {
    this.router.navigate(['/auth']);
  }
}
