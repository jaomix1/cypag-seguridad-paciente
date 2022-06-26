import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
//import { MenuService } from '../menu.service';
// import { CookieService } from 'ngx-cookie-service';
// import { MenuService } from '../servicios/menu.service';

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

constructor(
  private breakpointObserver: BreakpointObserver, 
  //public cookieService: CookieService,
  //public m : MenuService,
  ) 
  {      
    //let loginId = this.cookieService.get('token');   
    //this.m.datos(loginId)
  }

}
