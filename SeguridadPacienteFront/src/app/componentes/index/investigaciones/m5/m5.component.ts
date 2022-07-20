import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { MsService } from 'src/app/servicios/investigaciones/ms.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';

@Component({
  selector: 'app-m5',
  templateUrl: './m5.component.html',
  styleUrls: ['./m5.component.css']
})
export class M5Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MsService: MsService,
    public mainService: MainService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<M5Component>,
  ) {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
  }
  realizado: boolean = false;
  m5:any;

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
    M5_1: new FormControl(''),
    M5_2: new FormControl(''),
    M5_3: new FormControl(''),
    M5_4: new FormControl(''),
    M5_5: new FormControl(''),
    M5_Otro: new FormControl(''),
  });


  ngOnInit(): void {
    console.log(this.data)
    if (this.data.all_data.M5 != null){
      this.m5 = this.data.all_data.M5;
      this.realizado = true;
      this.form.disable();
      this.setData();
    }else{
      this.realizado = false;
    }
  }

  setData() {
    this.form.controls['M5_1'].setValue(this.m5?.M5_1);
    this.form.controls['M5_2'].setValue(this.m5?.M5_2);
    this.form.controls['M5_3'].setValue(this.m5?.M5_3);
    this.form.controls['M5_4'].setValue(this.m5?.M5_4);
    this.form.controls['M5_5'].setValue(this.m5?.M5_5);
    this.form.controls['M5_Otro'].setValue(this.m5?.M5_Otro);
  }

  submit() {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
    console.log(this.form.value)
    if (this.form.valid) {
      this.MsService.send(this.form.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
          this.realizado = true;
          this.form.disable();
          this.mejoras();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  borrar(){
    this.MsService.borrar(this.data?.id_detalle).subscribe({
      next: (req:any) => {
        console.log(req)
        this.form.reset();
        this.mainService.showToast('Eliminado Correctamente');
        this.realizado = false;
        this.form.enable();
      },
      error: (err: string) => {
        console.log(err)
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
      }
    });
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
