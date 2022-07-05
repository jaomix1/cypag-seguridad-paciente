import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { PqService } from 'src/app/servicios/investigaciones/pq.service';
import { MsService } from 'src/app/servicios/investigaciones/ms.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-ms-pq',
  templateUrl: './ms-pq.component.html',
  styleUrls: ['./ms-pq.component.css']
})
export class MsPqComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MsService: MsService,
    private PqService: PqService,
    public mainService: MainService,
    public dialogRef: MatDialogRef<MsPqComponent>,
  ) {
    this.formMS.controls['Id_Detalle'].setValue(this.data.id);
    this.formPQ.controls['Id_Detalle'].setValue(this.data.id);
  }

  formMS = new FormGroup({
    Id_Detalle: new FormControl(''),
    InAtraves: new FormControl('5 M´s'),
    M5_1: new FormControl(''),
    M5_2: new FormControl(''),
    M5_3: new FormControl(''),
    M5_4: new FormControl(''),
    M5_5: new FormControl(''),
    M5_Otro: new FormControl(''),
  });

  formPQ = new FormGroup({
    Id_Detalle: new FormControl(''),
    InAtraves: new FormControl('5 porques'),
    P5_1: new FormControl(''),
    P5_2: new FormControl(''),
    P5_3: new FormControl(''),
    P5_4: new FormControl(''),
    P5_5: new FormControl(''),
  });


  ngOnInit(): void {
    console.log(this.data)
  }


  submitMS() {
    console.log(this.formMS.value)
    if (this.formMS.valid) {
      this.MsService.send(this.formMS.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  submitPQ() {
    console.log(this.formPQ.value)
    if (this.formPQ.valid) {
      this.PqService.send(this.formPQ.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  validateMS(nameInput: string) {
    return this.mainService.validateInput(this.formMS, nameInput);
  }

  checkMS(nameInput: string) {
    return this.mainService.checkInput(this.formMS, nameInput);
  }

  validatePQ(nameInput: string) {
    return this.mainService.validateInput(this.formPQ, nameInput);
  }

  checkPQ(nameInput: string) {
    return this.mainService.checkInput(this.formPQ, nameInput);
  }

  cancelar(){
    this.dialogRef.close();
  }
}

