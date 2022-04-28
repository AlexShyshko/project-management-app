import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/boards/new-board/new-board.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog) {}

  headerSticky: boolean = false;

  @ViewChild('header') header: ElementRef;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.headerSticky = window.scrollY > this.header.nativeElement.offsetHeight;
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

  openDialog() {
    this.dialog.open(NewBoardComponent, { panelClass: 'custom-dialog-container' });
  }

}
