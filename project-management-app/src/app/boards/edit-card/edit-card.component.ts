import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api';
import { BoardsService } from 'src/app/core/services/boards.service';
import { CoreService } from 'src/app/core/services/core.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    description: new FormControl(''),
  });

  public subscriptions: Subscription[] = [];

  isEditTitleEnable = false;

  isEditDescriptionEnable = false;

  title = this.data.task.title;

  description = this.data.task.description;

  userName: string;

  fileName = '';

  file = this.data.task.files[0];

  constructor(
    private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; task: Task; columnId: string },
    public translate: TranslateService,
    public coreService: CoreService,
    private storageService: StorageService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.coreService.currentLang.subscribe((lang) => {
        this.translate.use(lang);
      }),
    );
    this.getOwnerTaskName();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  submit() {
    this.boardsService.editTask({
      boardId: this.data.boardId,
      id: this.data.task.id!,
      title: this.title,
      description: this.description,
      columnId: this.data.columnId,
      order: this.data.task.order,
      done: this.data.task.done,
    });
  }

  editTitle() {
    const titleLength = this.form.get('title')?.value.trim().length;
    if (titleLength && titleLength <= 50) {
      this.title = this.form.get('title')?.value;
      this.isEditTitleEnable = !this.isEditTitleEnable;
    }
  }

  editDescription() {
    const descriptionLength = this.form.get('description')?.value.trim().length;
    this.description = this.form.get('description')?.value;
    this.isEditDescriptionEnable = !this.isEditDescriptionEnable;
  }

  getOwnerTaskName() {
    const token = this.storageService.getToken()!;
    return this.apiService.getUserById(token, this.data.task.userId).subscribe(collection => {
      this.userName = collection.name.trim()[0].toUpperCase();
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.apiService.uploadFile(this.storageService.getToken(), this.data.task.id, file).subscribe(res => console.log(res));
    }
  }

  download(fileName: string) {
    this.apiService.downloadFile(this.storageService.getToken(), this.data.task.id, fileName).subscribe(res => console.log(res));
  }
}
