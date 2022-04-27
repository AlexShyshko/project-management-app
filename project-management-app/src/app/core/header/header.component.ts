import { state, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

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

  constructor() {}

}
