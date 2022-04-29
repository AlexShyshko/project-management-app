import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/boards/new-board/new-board.component';
import { CoreService } from '../services/core.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog, public coreService: CoreService) {}

  headerSticky: boolean = false;

  @ViewChild('header') header: ElementRef;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.headerSticky = window.scrollY > this.header.nativeElement.offsetHeight;
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public signin() {
    this.router.navigate(['/auth']);
  }

  openDialog() {
    this.dialog.open(NewBoardComponent, { panelClass: 'custom-dialog-container' });
  }

}
