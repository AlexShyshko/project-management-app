import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CustomValidator } from 'src/app/shared/services/customValidator';
import { ApiService } from '../services/api';
import { StorageService } from '../services/storage.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  hide = true;

  form: FormGroup;

  constructor(public apiService: ApiService, private router: Router, private formBuilder: FormBuilder, private storageService: StorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.upperCaseValidator,
        CustomValidator.lowerCaseValidator,
        CustomValidator.numbersValidator,
        CustomValidator.symbolsValidator,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    }, {
      validator: CustomValidator.passwordValidator,
    });

  }


  submit(name: string, login: string, password: string) {
    const user: User = {
      name,
      login,
      password,
    };
    // this.apiService.updateUser().subscribe(res => console.log(res));
    if (this.form.valid) {
      this.router.navigate(['/main']);
    }
  }

  openDialog() {
    this.dialog.open(ConfirmationComponent, { panelClass: 'custom-dialog-container' });
  }

}
