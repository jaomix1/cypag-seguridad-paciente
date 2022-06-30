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
    @Inject(MAT_DIALOG_DATA) public type: string,
    private MsService: MsService,
    private PqService: PqService,
    public mainService: MainService,
    public dialogRef: MatDialogRef<MsPqComponent>,
  ) { }

  formMS = new FormGroup({
    ms1: new FormControl(''),
    ms2: new FormControl(''),
    ms3: new FormControl(''),
    ms4: new FormControl(''),
    ms5: new FormControl(''),
    msOtro: new FormControl(''),
  });

  formPQ = new FormGroup({
    pq1: new FormControl(''),
    pq2: new FormControl(''),
    pq3: new FormControl(''),
    pq4: new FormControl(''),
    pq5: new FormControl(''),
  });


  ngOnInit(): void {
  }


  submitMS() {
    console.log(this.formMS.value)
    if (this.formMS.valid) {
      this.MsService.send(this.formMS.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  submitPQ() {
    console.log(this.formMS.value)
    if (this.formMS.valid) {
      this.PqService.send(this.formMS.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente');
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

