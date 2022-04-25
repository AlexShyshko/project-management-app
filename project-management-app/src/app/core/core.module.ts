import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../shared/modules/material.module';
import { IncorrectPageComponent } from './incorrect-page/incorrect-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent, IncorrectPageComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [HeaderComponent, FooterComponent, MainComponent, IncorrectPageComponent, RouterModule],
})
export class CoreModule {}
