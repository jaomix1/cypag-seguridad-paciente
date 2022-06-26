import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getUrlLogin() {
  return "login";
}


if (environment.production) {
  enableProdMode();
}

const provider = [
  { provide: "UrlLogin", useFactory: getUrlLogin, deps: [] },
];

platformBrowserDynamic(provider).bootstrapModule(AppModule)
  .catch(err => console.error(err));
