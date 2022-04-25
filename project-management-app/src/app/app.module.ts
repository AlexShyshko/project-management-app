import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiCheckComponent } from './api-check/api-check.component';
import { ApiService } from './apis/api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ApiCheckComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
