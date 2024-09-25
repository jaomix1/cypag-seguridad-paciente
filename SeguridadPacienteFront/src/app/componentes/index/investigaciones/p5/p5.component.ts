import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { PqService } from 'src/app/servicios/investigaciones/pq.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.css']
})
export class P5Component implements OnInit {
  oportunidad_Mejora: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PqService: PqService,
    public mainService: MainService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<P5Component>,
  ) {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);
  }
  realizado: boolean = false;
  pq: any;

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
    P5_1: new FormControl(''),
    P5_2: new FormControl(''),
    P5_3: new FormControl(''),
    P5_4: new FormControl(''),
    P5_5: new FormControl(''),
    Oportunidad_Mejora: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {

    if (this.data.all_data.P5 != null) {
      this.pq = this.data.all_data.P5;
      this.oportunidad_Mejora = this.data.all_data.Detalle.Oportunidad_Mejora;
      this.realizado = true;
      this.form.disable();
      this.setData();
    } else {
      this.realizado = false;
    }
  }

  setData() {
    this.form.controls['P5_1'].setValue(this.pq?.P5_1);
    this.form.controls['P5_2'].setValue(this.pq?.P5_2);
    this.form.controls['P5_3'].setValue(this.pq?.P5_3);
    this.form.controls['P5_4'].setValue(this.pq?.P5_4);
    this.form.controls['P5_5'].setValue(this.pq?.P5_5);
    this.form.controls['Oportunidad_Mejora'].setValue(this.oportunidad_Mejora);
  }

  submit() {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);

    if (this.form.valid) {
      this.PqService.send(this.form.value).subscribe({
        next: (req: any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
          this.realizado = true;
          this.form.disable();
          //this.mejoras();
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }

  borrar() {
    this.PqService.borrar(this.data?.id_detalle).subscribe({
      next: (req: any) => {

        this.form.reset();
        this.mainService.showToast('Eliminado Correctamente');
        this.realizado = false;
        this.form.enable();
      },
      error: (err: string) => {

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

  cancelar() {
    this.dialogRef.close();
  }
}
