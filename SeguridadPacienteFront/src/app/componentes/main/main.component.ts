import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from 'src/app/componentes/baseComponent';
import { DemoService } from 'src/app/servicios/demo/demo.service';
import { Demo } from 'src/app/modelos/demo/demo';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CombosService } from 'src/app/servicios/combos.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface Testigo {
  name: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseFormComponent implements OnInit  {
  datos: Demo = new Demo();

  form = new FormGroup({
    fecha:  new FormControl('', [
      Validators.required,
    ]),
    hora:  new FormControl('', [
      Validators.required,
    ]),
    nombre:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    cargo: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(this.latin),
    ]),
    empresa:  new FormControl('', [
      Validators.required
    ]),
    sede:  new FormControl('', [
      Validators.required
    ]),
    paciente:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    tipoDocumento:  new FormControl('', [
      Validators.required,
    ]),
    documento:  new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.pattern(this.latin),
    ]),
    sexo:  new FormControl('', [
      Validators.required
    ]),
    edad:  new FormControl('', [
      Validators.required
    ]),
    novedad:  new FormControl('', [
      Validators.required
    ]),
    quePaso:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    comoPaso:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    huboTestigos:  new FormControl('', [
      Validators.required
    ]),
    testigos:  new FormControl('', []),
    seProdujo:  new FormControl('', [
      Validators.required
    ]),
    involuntario:  new FormControl('', [
      Validators.required
    ]),
    generoDanos:  new FormControl('', [
      Validators.required
    ]),
    dano:  new FormControl('', [
      Validators.maxLength(30),
      Validators.pattern(this.latin),
    ]),
    severidad:  new FormControl('', []),
    accionTomada:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    evidencias:  new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private myService: DemoService,
    public combosService: CombosService,
    public mainService: MainService) {
    super();
  }

  addOnBlur = true;
  hayDanos = false;
  hayTestigos = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  testigos: Testigo[] = [{name: 'Jhonatan'}];

  ngOnInit(): void {}

  submit(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      this.loadingMain = true;
      this.myService.create(this.form.value).subscribe({
        next: (req) => {
          this.loadingMain = false;
          this.mainService.showToast('Creado Correctamente');
          this.datos = req;
          this.cancelar(true);
        },
        error: (err: string) => {
          this.loadingMain = false;
          this.mainService.showToast(err, 'error');
        },
        complete: () => (this.loadingMain = false),
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.testigos.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Testigo): void {
    const index = this.testigos.indexOf(fruit);
    if (index >= 0) {
      this.testigos.splice(index, 1);
    }
  }

  //cargar sedes depende de la empresa
  sedes: any;
  sede(empresa:any){
    this.sedes = this.combosService.comboSedes.filter((s:any) => s.EmpresaId == empresa)
  }


  cancelar(status: boolean) {
    this.form.reset();
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  viewTestigos(id: any){
    if(id == "si"){
      this.hayTestigos = true;
    }else{
      this.hayTestigos = false;
    }
  }
  viewDano(id: any){
    if(id == "si"){
      this.hayDanos = true;
    }else{
      this.hayDanos = false;
    }
  }
}

