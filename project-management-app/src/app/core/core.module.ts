import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../shared/modules/material.module';
import { IncorrectPageComponent } from './incorrect-page/incorrect-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api';
import { TranslatingModule } from '../shared/translating/translating.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationComponent } from './edit-profile/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent, IncorrectPageComponent, EditProfileComponent, ConfirmationComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes), TranslatingModule, ReactiveFormsModule,
    FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    IncorrectPageComponent,
    EditProfileComponent,
    RouterModule,
    TranslatingModule,
  ],
  providers: [ApiService],
})
export class CoreModule {}
