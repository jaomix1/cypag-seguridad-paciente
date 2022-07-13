import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../baseComponent';
import { LoginService } from 'src/app/servicios/usuarios/login.service';
import { MainService } from 'src/app/servicios/main.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseFormComponent implements OnInit  {


  tamano : any = { col : 1};
  tamano2 : any = { col : 1};
  hidePassword = true;
  form = new FormGroup({
    Usuario: new FormControl('', [Validators.required,]),
    Clave: new FormControl('', [Validators.required]),
  })


  constructor(
    public mainService: MainService,
    private LoginService: LoginService,
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
    if (this.form.valid) {
      this.loadingMain = true;

      this.LoginService.login(this.form.value).subscribe({
        next: (req) => {
          this.LoginService.setToken(req);
            this.router.navigate(["/index"]);
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
          this.loadingMain = false
        },
        complete: () => this.loadingMain = false
      })
    }
  }

  cancelar(){
    this.router.navigate(["/main"]);
  }
}
