import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IndexModule } from './componentes/index/index.module';
import { LoginModule } from './componentes/login/login.module';
import { MainModule } from './componentes/main/main.module';
import { PdfModule } from './componentes/pdf/pdf.module';


import {  MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NoopAnimationsModule,

    //Index
    IndexModule,

    //login
    LoginModule,

    //main
    MainModule,

    //PdfComponent

    PdfModule,

    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
