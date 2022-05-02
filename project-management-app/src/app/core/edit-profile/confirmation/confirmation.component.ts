import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteUser() {
    // this.apiService.deleteUser();
    this.storageService.logout();
    this.router.navigate(['/']);
  }
}
