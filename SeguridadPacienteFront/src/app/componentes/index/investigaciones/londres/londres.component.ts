import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CombosLondresService } from 'src/app/servicios/combo/combos-londres.service';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';
import { MainService } from 'src/app/servicios/main.service';
import { LondresService } from 'src/app/servicios/investigaciones/londres.service';
import { DialogConfirmacionComponent } from 'src/app/componentes/dialog-confirmacion/dialog-confirmacion.component';
import { PdfComponent } from '../../../pdf/pdf.component';
@Component({
  selector: 'app-londres',
  templateUrl: './londres.component.html',
  styleUrls: ['./londres.component.css']
})
export class LondresComponent implements OnInit {

  type: any = 1;
  combo: any;
  options: any;
  realizado: boolean = false;
  londres:any;

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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
    this.form.controls['Tipo_Adverso'].setValue(this.data.all_data.Detalle.Tipo_Novedad_Join.Descripcion);
    this.type = this.data.all_data.Detalle.Tipo_Novedad;
    this.cargaOptions();
  }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.all_data.Londres != null){
      this.londres = this.data.all_data.Londres;
      this.realizado = true;
      this.form.disable()
      this.setData();
    }else{
      this.realizado = false;
    }
  }

  setData(){
    this.form.controls['Tipo_Adverso'].setValue(this.londres.Tipo_Adverso);
    this.form.controls['Select_Depende_Tipo'].setValue(this.londres.Select_Depende_Tipo);
    this.form.controls['Fase1_Analisis'].setValue(this.londres.Fase1_Analisis);
    this.form.controls['Fase1_Otros_Mecanismos'].setValue(this.londres.Fase1_Otros_Mecanismos);
    this.form.controls['Fase1_Entrevista'].setValue(this.londres.Fase1_Entrevista);
    this.form.controls['Fase1_Cronologia'].setValue(this.londres.Fase1_Cronologia);

    this.form.controls['Fase2_Acciones_Inseguras'].setValue(this.londres.Fase2_Acciones_Inseguras);
    this.form.controls['Fase2_Equipo'].setValue(this.londres.Fase2_Equipo);
    this.form.controls['Fase2_Individuo'].setValue(this.londres.Fase2_Individuo);
    this.form.controls['Fase2_Administrativos'].setValue(this.londres.Fase2_Administrativos);
    this.form.controls['Fase2_Tareas'].setValue(this.londres.Fase2_Tareas);
    this.form.controls['Fase2_Paciente'].setValue(this.londres.Fase2_Paciente);
    this.form.controls['Fase2_Equipo_Observaciones'].setValue(this.londres.Fase2_Equipo_Observaciones);
    this.form.controls['Fase2_Individuo_Observaciones'].setValue(this.londres.Fase2_Individuo_Observaciones);
    this.form.controls['Fase2_Administrativos_Observaciones'].setValue(this.londres.Fase2_Administrativos_Observaciones);
    this.form.controls['Fase2_Tareas_Observaciones'].setValue(this.londres.Fase2_Tareas_Observaciones);
    this.form.controls['Fase2_Paciente_Observaciones'].setValue(this.londres.Fase2_Paciente_Observaciones);
    this.form.controls['Fase2_Analisis_Problema'].setValue(this.londres.Fase2_Analisis_Problema);

    this.form.controls['Fase3_Complicacion'].setValue(this.londres.Fase3_Complicacion);
    this.form.controls['Evento_Adverso_Tipo'].setValue(this.londres.Evento_Adverso_Tipo);
    this.form.controls['Evento_Adverso_Estado'].setValue(this.londres.Evento_Adverso_Estado);
    this.form.controls['Fase3_Preg_Segunda'].setValue(this.londres.Fase3_Preg_Segunda);
    this.form.controls['Fase3_Acciones_Segunda'].setValue(this.londres.Fase3_Acciones_Segunda);
    this.form.controls['Fase3_Preg_Tercera'].setValue(this.londres.Fase3_Preg_Tercera);
    this.form.controls['Fase3_Acciones_Tercera'].setValue(this.londres.Fase3_Acciones_Tercera);
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
          this.realizado = true;
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
    this.dialog.open(DialogConfirmacionComponent, {
        disableClose: true,
        width: '300px',
        data: {message: '¿Estas seguro de escoger el tipo: '+ option +'?'}
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        this.form.controls['Evento_Adverso_Tipo'].setValue(option);
      }
    );
  }

  estado(option: string){
    this.dialog.open(DialogConfirmacionComponent, {
      disableClose: true,
      width: '300px',
      data: {message: '¿Estas seguro de escoger el tipo: '+ option +'?'}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      this.form.controls['Evento_Adverso_Estado'].setValue(option);
    }
  );
  }

  mejoras(){
    const dialogRef = this.dialog.open(OportunidadesFormComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: this.data?.all_data.Master.Id
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  pdf(){
    const dialogRef = this.dialog.open(PdfComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: this.data.all_data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  borrar(){
    this.LondresService.borrar(this.data?.id_detalle).subscribe({
      next: (req:any) => {
        console.log(req)
        this.form.reset();
        this.mainService.showToast('Eliminado Correctamente');
        this.realizado = false;
        this.type = this.data.all_data.Detalle.Tipo_Novedad;
        this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
        this.form.controls['Tipo_Adverso'].setValue(this.data.all_data.Detalle.Tipo_Novedad_Join.Descripcion);
        this.form.enable()
      },
      error: (err: string) => {
        console.log(err)
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
      }
    });
  }
}
