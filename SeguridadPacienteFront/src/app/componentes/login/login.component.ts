import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  loginForm = new FormGroup({
    Correo: new FormControl('123', [Validators.required,]),
    Clave: new FormControl('123', [Validators.required]),
  })

  showPassword = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      // this.ls.login(this.loginForm.value).subscribe(req => {
      //   this.cookieService.set("token", req);
      //   this.m.datos(req)
      //   this.router.navigate(["/index"]);
      // }, error => {
      //   this.loginForm.reset();
      //   this.error(error);  
      //   this.loanding = false;      
      // }, () => this.loanding = false)
      
    }

  }

}
