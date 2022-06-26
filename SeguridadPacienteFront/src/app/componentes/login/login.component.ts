import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../baseComponent';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormComponent implements OnInit  {


  tamano : any = { col : 1};
  tamano2 : any = { col : 1};
  hidePassword = true;
  loginForm = new FormGroup({
    Correo: new FormControl('', [Validators.required,]),
    Clave: new FormControl('', [Validators.required]),
  })


  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    ) {
      super();
    }

  ngOnInit(): void {  

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col : 0, row : 1};
          this.tamano2 = { col : 3, row : 1};
        }else{
          this.tamano = { col : 1, row : 1};
          this.tamano2 = { col : 1, row : 1};
        }
      });
  }

  login() {
    this.router.navigate(["/index"]);
  }

  cancelar(){
    this.router.navigate(["/main"]);

  }
}
