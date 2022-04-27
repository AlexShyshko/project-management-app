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
import { HttpClientModule } from '@angular/common/http';
import { SignUpModule } from './auth/sign-up/sign-up.module';

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
    MaterialModule,
    HttpClientModule,
    SignUpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
