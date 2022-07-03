import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MsPqComponent } from '../investigaciones/ms-pq/ms-pq.component';
import { NaranjoComponent } from '../investigaciones/naranjo/naranjo.component';
import { LondresComponent } from '../investigaciones/londres/londres.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectInvestigacionComponent } from '../investigaciones/select-investigacion/select-investigacion.component';
import { DialogConfirmacionComponent } from '../../dialog-confirmacion/dialog-confirmacion.component';
import { QueryService } from 'src/app/servicios/query/search.service';
import { MainService } from 'src/app/servicios/main.service';
import { DetallesService } from 'src/app/servicios/Detalles/detalles.service';

export interface Testigo {
  name: string;
}

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})


export class DetallesComponent implements OnInit {
  private detalleId : string;

  tamano : any = { col : 1, row: 1};
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  responsables: Testigo[] = [];
  data: any = "Esta es una data de prueba";

  form = new FormGroup({
    id_Master: new FormControl(null, [Validators.required]),
    Tipo_Investacion: new FormControl(null, [Validators.required]),
    Triada_Involuntario: new FormControl(null, [Validators.required]),
    Triada_Genero_Dano: new FormControl(null, [Validators.required]),
    Triada_Atencion_Salud: new FormControl(null, [Validators.required]),
    Tipo_Detalle: new FormControl(null, [Validators.required]),
    Responsables: new FormControl(null, [Validators.required]),
  });

  constructor(
    public mainService: MainService,
    public DetallesService: DetallesService,
    private QueryService: QueryService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public dialogRef: MatDialogRef<DetallesComponent>,)
    {
      this.detalleId = guid;
      this.obtenerDetalle(this.detalleId)
    }

  ngOnInit(): void {
  }

  obtenerDetalle(id : string){
    this.QueryService.get(id).subscribe({
      next: (req) => {
        this.data = req[0];
        console.log(this.data)
        //this.cancelar();
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  //cerrar modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    if(this.data.Preg_En_Atencion && this.data.Preg_Involuntario && this.data.Preg_Genero_Dano){
      this.form.value.Tipo_Investigacion = 1
    }else{
      if(this.data.Preg_En_Atencion && this.data.Preg_Involuntario && !this.data.Preg_Genero_Dano){
        this.form.value.Tipo_Investigacion = 2
      }else{
        if(!this.data.Preg_En_Atencion && this.data.Preg_Involuntario && this.data.Preg_Genero_Dano){
          this.form.value.Tipo_Investigacion = 3
        }else{
          this.form.value.Tipo_Investigacion = 4
        }
      }
    }

    if(this.form.value){
      this.DetallesService.create(this.form.value).subscribe({
        next: (req:any) => {
          console.log(req)
          this.mainService.showToast('Guardado Correctamente');
        },
        error: (err: string) => {
          console.log(err)
          this.mainService.showToast(err, 'error');
        },
        complete: () => {
          switch (this.form.value.Tipo_Investigacion) {
            case 1:

              break;
            case 2:

              break;
            case 3:

              break;
            case 4:

              break;

            default:
              break;
          }
        }
      });
    }

  }

  type: any;
  obtenerTipo(id : string){
    this.dialog.open(DialogConfirmacionComponent, {
      disableClose: true,
      width: '300px',
      data: {message: '¿Estas seguro de escoger el tipo: '+ id +'?'}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        switch (id) {
          case "Farmacovigilancia":
            this.type = "Farmacovigilancia"
            break;
          case "Gestion Clinica":
            this.type = "Gestion_Clinica"
            break;
          case "Reactivovigilancia":
            this.type = "Reactivovigilancia"
            break;
          case "Tecnovigilancia":
            this.type = "Tecnovigilancia"
            break;
          default:
            console.log('default');
        }
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.responsables.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Testigo): void {
    const index = this.responsables.indexOf(fruit);
    if (index >= 0) {
      this.responsables.splice(index, 1);
    }
  }

  pqms(){
    const dialogRef = this.dialog.open(SelectInvestigacionComponent, {
      width: '100%',
      height: '50%',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  naranjo(){
    const dialogRef = this.dialog.open(NaranjoComponent, {
      width: '100%',
      height: '100%',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  londres(){
    const dialogRef = this.dialog.open(LondresComponent, {
      width: '100%',
      height: '100%',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
