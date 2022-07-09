import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CombosLondresService } from 'src/app/servicios/combo/combos-londres.service';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';
import { MainService } from 'src/app/servicios/main.service';
import { LondresService } from 'src/app/servicios/investigaciones/londres.service';
@Component({
  selector: 'app-londres',
  templateUrl: './londres.component.html',
  styleUrls: ['./londres.component.css']
})
export class LondresComponent implements OnInit {

  type: any = 1;
  combo: any;

  options: any;

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
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
    public mainService: MainService,
    public LondresService: LondresService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LondresComponent>,
    public CombosLondresService: CombosLondresService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
  ){
    this.form.controls['Id_Detalle'].setValue(this.guid);
    this.cargaOptions();
  }

  ngOnInit(): void {
  }

  cargaOptions() {
    this.options = this.CombosLondresService.arrayOptions.filter((option:any) => option.type === this.type)
    console.log("opciones",this.options)
  }

  submit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.LondresService.send(this.form.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  tipo(option: string){
    this.form.controls['Evento_Adverso_Tipo'].setValue(option);
  }

  estado(option: string){
    this.form.controls['Evento_Adverso_Estado'].setValue(option);
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
