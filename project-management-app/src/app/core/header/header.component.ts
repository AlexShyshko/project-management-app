import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from 'src/app/boards/new-board/new-board.component';
import { CoreService } from '../services/core.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    public coreService: CoreService,
    private storageService: StorageService,
    public translate: TranslateService,
  ) {}

  isLogged: boolean = false;

  headerSticky: boolean = false;

  @ViewChild('header') header: ElementRef;

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.headerSticky = window.scrollY > this.header.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.storageService.isLogged$.subscribe((value) => (this.isLogged = value)),
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public showName() {
    const name = this.storageService.getUserName();
    if (!name) return 'core.header.my-account';

    return name;
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
