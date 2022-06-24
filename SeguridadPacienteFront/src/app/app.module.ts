import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbWindowModule,
  NbToastrModule,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { IndexModule } from './index/index.module';
import { LoginModule } from './componentes/login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,

    IndexModule,

    LoginModule,

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NgbModule,
    NbWindowModule.forRoot({
      hasBackdrop: true,
      closeOnEsc: false,
      buttons: { maximize: false, minimize: false, close: false },
    }),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: 'success',
      duration: 5000,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
