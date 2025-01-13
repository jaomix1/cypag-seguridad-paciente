import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/servicios/usuarios/login.service';
import { MenuService } from 'src/app/servicios/usuarios/menu.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  Logout() {
    this.LoginService.deleteToken()
    location.href = "/login";
  }

  constructor(
    private LoginService: LoginService,
    private breakpointObserver: BreakpointObserver,

    public m: MenuService,
  ) {
    let loginId = this.LoginService.getToken();
    this.m.datos(loginId)
  }

}
