import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  tasks$ = new Observable<Task[]>();

  private inputChanged = new Subject<string>();

  searchValue = '';

  columnTitle: string;

  boardTitle: string;

  constructor(public translate: TranslateService, public coreService: CoreService, private boardService: BoardsService, private apiService: ApiService, private storageService: StorageService) {
    this.inputSearchString();
  }

  ngOnInit(): void {
    this.boardService.getTasksForSearch();
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private inputSearchString(): void {
    this.inputChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.search(value);
      });
  }

  public searchHandler(value: string): void {
    this.inputChanged.next(value);
  }

  search(value: string) {
    const searchValue = isNaN(+value) ? value : +value;
    this.tasks$ = this.boardService.searchTaskByInput(searchValue);
  }

}
