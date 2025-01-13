import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '../servicios/usuarios/menu.service';
import { LoginService } from '../servicios/usuarios/login.service';



@Injectable({
  providedIn: 'root'
})
export class AccesoAdmin implements CanActivate {
  cookieValue = '';
  icon = '';

  public loginId: string = "";
  public _baseUrlLogin: string;

  constructor(private router: Router,
    @Inject('UrlLogin') baseUrlLogin: string,
    public LoginService: LoginService,
    private m: MenuService
  ) {
    this._baseUrlLogin = baseUrlLogin;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.loginId = this.LoginService.getToken();
    this.m.datos(this.loginId);

    if (this.loginId == "" || this.loginId == undefined || (this.m.datosUsuario.PerfilId != "733209DA-5F31-4BAE-A7CD-E6CCC20C8BA8")) {
      const tree: UrlTree = this.router.parseUrl(this._baseUrlLogin);
      return tree;
    }

    return true;
  }

}
