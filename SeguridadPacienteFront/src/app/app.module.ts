import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './control/Interceptors';
import { LoginService } from './servicios/usuarios/login.service';
import { CookieService } from 'ngx-cookie-service';

/* This is to set the locale to spanish. */
import localeEs from '@angular/common/locales/es';
import { registerLocaleData} from '@angular/common';
registerLocaleData(localeEs, 'es');


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IndexModule } from './componentes/index/index.module';
import { LoginModule } from './componentes/login/login.module';
import { MainModule } from './componentes/main/main.module';
import { PdfModule } from './componentes/pdf/pdf.module';


import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ComboService } from './servicios/combo/combo.service';

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
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {provide: LOCALE_ID, useValue: 'es-CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
