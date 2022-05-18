import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-incorrect-page',
  templateUrl: './incorrect-page.component.html',
  styleUrls: ['./incorrect-page.component.scss'],
})
export class IncorrectPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  constructor(public translate: TranslateService, public coreService: CoreService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
