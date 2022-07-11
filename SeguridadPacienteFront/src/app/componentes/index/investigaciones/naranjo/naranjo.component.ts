import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { NaranjoService } from 'src/app/servicios/investigaciones/naranjo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';

@Component({
  selector: 'app-naranjo',
  templateUrl: './naranjo.component.html',
  styleUrls: ['./naranjo.component.css']
})
export class NaranjoComponent implements OnInit {

  constructor(
    public mainService: MainService,
    public NaranjoService: NaranjoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NaranjoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
  }

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
    Naranjo_1: new FormControl(''),
    Naranjo_2: new FormControl(''),
    Naranjo_3: new FormControl(''),
    Naranjo_4: new FormControl(''),
    Naranjo_5: new FormControl(''),
    Naranjo_6: new FormControl(''),
    Naranjo_7: new FormControl(''),
    Naranjo_8: new FormControl(''),
    Naranjo_9: new FormControl(''),
    Naranjo_10: new FormControl(''),
    Naranjo_Observaciones: new FormControl(''),
    Evento_Adverso_Tipo: new FormControl(''),
    Evento_Adverso_Estado: new FormControl(''),
  });
  realizado: boolean = false;
  naranjo:any;

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.all_data.Naranjo != null){
      this.naranjo = this.data.all_data.Naranjo;
      this.realizado = true;
    }else{
      this.realizado = false;
    }
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

  delet(){
    this.NaranjoService.borrar(this.data?.id_detalle).subscribe({
      next: (req:any) => {
        console.log(req)
        this.form.reset();
        this.mainService.showToast('Eliminado Correctamente');
        this.realizado = false;
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
