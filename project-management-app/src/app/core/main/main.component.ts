import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CoreService } from '../services/core.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  public isLogged: boolean;

  constructor(
    public translate: TranslateService,
    public coreService: CoreService,
    public storageService: StorageService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
      this.storageService.isLogged$.subscribe((loggedStatus) => {
        this.isLogged = loggedStatus;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  login() {
    this.storageService.isLogged$.next(true);
  }
}
