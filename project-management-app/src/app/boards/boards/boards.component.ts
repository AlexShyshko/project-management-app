import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../core/services/core.service';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  constructor(public translate: TranslateService, public coreService: CoreService) {}

  ngOnInit(): void {}
}
