import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CombosLondresService } from 'src/app/servicios/combo/combos-londres.service';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';
@Component({
  selector: 'app-londres',
  templateUrl: './londres.component.html',
  styleUrls: ['./londres.component.css']
})
export class LondresComponent implements OnInit {

  type: any = 1;
  combo: any;

  form = new FormGroup({
    Tipo_Adverso: new FormControl(''),
    Select_Depende_Tipo: new FormControl(''),
    Fase1_Analisis: new FormControl(''),
    Fase1_Entrevista: new FormControl(''),
    Fase1_Otros_Mecanismos: new FormControl(''),
    Fase1_Cronologia: new FormControl(''),
    Fase2_Acciones_Inseguras: new FormControl(''),
    Fase2_Equipo: new FormControl(''),
    Fase2_Individuo: new FormControl(''),
    Fase2_Administrativos: new FormControl(''),
    Fase2_Tareas: new FormControl(''),
    Fase2_Paciente: new FormControl(''),
    Fase2_Equipo_Observaciones: new FormControl(''),
    Fase2_Individuo_Observaciones: new FormControl(''),
    Fase2_Administrativos_Observaciones: new FormControl(''),
    Fase2_Tareas_Observaciones: new FormControl(''),
    Fase2_Paciente_Observaciones: new FormControl(''),
    Fase2_Analisis_Problema: new FormControl(''),
    Fase3_Complicacion: new FormControl(''),
    Evento_Adverso_Tipo: new FormControl(''),
    Evento_Adverso_Estado: new FormControl(''),
    Fase3_Preg_Segunda: new FormControl(''),
    Fase3_Acciones_Segunda: new FormControl(''),
    Fase3_Preg_Tercera: new FormControl(''),
    Fase3_Acciones_Tercera: new FormControl(''),
  });


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LondresComponent>,
    public CombosLondresService: CombosLondresService
  ) { }

  ngOnInit(): void {
  }

  submit() {

  }

  cancelar(){
    this.dialogRef.close();
  }

  tipo(option: string){
    console.log(option)
  }

  estado(option: string){
    console.log(option)
  }

  mejoras(){
    const dialogRef = this.dialog.open(OportunidadesFormComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
