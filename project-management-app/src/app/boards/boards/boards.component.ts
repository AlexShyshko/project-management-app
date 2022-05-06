import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/models/board.model';
import { CoreService } from '../../core/services/core.service';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<Board[]> = of([]);

  constructor(
    public translate: TranslateService,
    public coreService: CoreService,
  ) {}

  ngOnInit(): void {}
}
