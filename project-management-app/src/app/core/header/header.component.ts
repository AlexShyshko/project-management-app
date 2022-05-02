import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/boards/new-board/new-board.component';
import { CoreService } from '../services/core.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog, public coreService: CoreService, private storageService: StorageService) {}

  isLogged: boolean = false;

  headerSticky: boolean = false;

  @ViewChild('header') header: ElementRef;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.headerSticky = window.scrollY > this.header.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    this.storageService.isLogged$.subscribe(value => this.isLogged = value);
  }

  public signup() {
    this.router.navigate(['/signup']);
  }

  public signin() {
    this.router.navigate(['/auth']);
  }

  public logout() {
    this.storageService.logout();
    this.router.navigate(['/']);
  }

  public editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  openDialog() {
    this.dialog.open(NewBoardComponent, { panelClass: 'custom-dialog-container' });
  }

}
