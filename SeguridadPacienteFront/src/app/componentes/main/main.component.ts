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
import { ComboService } from 'src/app/servicios/combo/combo.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Combo, ComboD } from 'src/app/modelos/combos/combo';

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
  //combos
  novedades!: ComboD[];
  sedes!: Combo[];
  empresas!: Combo[];
  identificaciones!: ComboD[];

  //cargar daños o testigos
  hayDanos = false;
  hayTestigos = false;


  //autocompletar
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  testigos: Testigo[] = [{name: 'Jhonatan'}];

  form = new FormGroup({
    Fecha_Incidente:  new FormControl('', [
      Validators.required,
    ]),
    Hora_Incidente:  new FormControl('', [
      Validators.required,
    ]),
    Nombre_Quien_Reporta:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    Cargo_Quien_Reporta: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(this.latin),
    ]),
    Empresa:  new FormControl('', [
      Validators.required
    ]),
    Sede:  new FormControl('', [
      Validators.required
    ]),
    Nombre_Paciente:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    Tipo_Id:  new FormControl('', [
      Validators.required,
    ]),
    Numero_Id:  new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.pattern(this.latin),
    ]),
    Sexo:  new FormControl('', [
      Validators.required
    ]),
    Edad:  new FormControl('', [
      Validators.required
    ]),
    Tipo_Novedad:  new FormControl('', [
      Validators.required
    ]),
    Preg_Que:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    Preg_Como:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    Preg_Hay_Testigos:  new FormControl('', [
      Validators.required
    ]),
    Preg_Quien:  new FormControl('', []),
    Preg_En_Atencion:  new FormControl('', [
      Validators.required
    ]),
    Preg_Involuntario:  new FormControl('', [
      Validators.required
    ]),
    Preg_Genero_Dano:  new FormControl('', [
      Validators.required
    ]),
    Preg_Dano_Generado:  new FormControl('', [
      Validators.maxLength(30),
      Validators.pattern(this.latin),
    ]),
    Preg_Dano_Severidad:  new FormControl('', []),
    Accion_Tomada:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    Imagen_Evidencia:  new FormControl(null, []),
    Imagen_Archivo:  new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private myService: DemoService,
    public comboService: ComboService,
    public mainService: MainService
  ) {
    super();

    this.cargaEmpresas();
    this.cargaIdentificaciones();
    this.cargaNovedades();
  }

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

  cargaIdentificaciones(){
    this.comboService.getIdentificacion().subscribe((data:any)=>{
      this.identificaciones = data;
      console.log(this.identificaciones);
    });
  }

  cargaNovedades(){
    this.comboService.getNovedades().subscribe((data:any)=>{
      this.novedades = data;
      console.log(this.novedades);
    });
  }

  cargaEmpresas(){
    this.comboService.getEmpresas().subscribe((data:any)=>{
      this.empresas = data;
      console.log(this.empresas);
    });
  }

  sede(empresa:any){
    this.comboService.getSedes(empresa).subscribe((data:any)=>{
      this.sedes = data;
      console.log(this.sedes);
    });
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

