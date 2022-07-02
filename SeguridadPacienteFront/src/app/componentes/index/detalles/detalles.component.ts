import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MsPqComponent } from '../investigaciones/ms-pq/ms-pq.component';
import { NaranjoComponent } from '../investigaciones/naranjo/naranjo.component';
import { LondresComponent } from '../investigaciones/londres/londres.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectInvestigacionComponent } from '../investigaciones/select-investigacion/select-investigacion.component';
import { DialogConfirmacionComponent } from '../../dialog-confirmacion/dialog-confirmacion.component';

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
  responsables: Testigo[] = [{name: 'Jhonatan'}];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public dialogRef: MatDialogRef<DetallesComponent>,) {
      this.detalleId = guid;
      this.obtenerDetalle(this.detalleId)
    }

  data: any = "Esta es una data de prueba";

  ngOnInit(): void {
  }

  obtenerDetalle(id : string){

  }

  //cerrar modal
  onNoClick(): void {
    this.dialogRef.close();
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
            console.log(this.type)
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
