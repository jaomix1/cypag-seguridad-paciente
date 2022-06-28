import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { NaranjoService } from 'src/app/servicios/investigaciones/naranjo.service';

@Component({
  selector: 'app-naranjo',
  templateUrl: './naranjo.component.html',
  styleUrls: ['./naranjo.component.css']
})
export class NaranjoComponent implements OnInit {

  constructor(
    public mainService: MainService,
    public NaranjoService: NaranjoService
  ) { }

  form = new FormGroup({
    naranjo1: new FormControl(''),
    naranjo2: new FormControl(''),
    naranjo3: new FormControl(''),
    naranjo4: new FormControl(''),
    naranjo5: new FormControl(''),
    naranjo6: new FormControl(''),
    naranjo7: new FormControl(''),
    naranjo8: new FormControl(''),
    naranjo9: new FormControl(''),
    naranjo10: new FormControl(''),
    observacion: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.NaranjoService.send(this.form.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  cancelar(){

  }
}
