import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/modules/material.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslatingModule } from './shared/translating/translating.module';
import { CoreService } from './core/services/core.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    CoreModule,
    AuthModule,
    BoardsModule,
    MaterialModule,
    HttpClientModule,
    TranslatingModule,
  ],
  providers: [CoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
