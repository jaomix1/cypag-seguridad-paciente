import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { NaranjoService } from 'src/app/servicios/investigaciones/naranjo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from 'src/app/componentes/dialog-confirmacion/dialog-confirmacion.component';
import { AggOportunityComponent } from 'src/app/componentes/index/oportunidades-de-mejora/agg-oportunity/agg-oportunity.component';

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
  naranjo: any;

  ngOnInit(): void {

    if (this.data.all_data.Naranjo != null) {
      this.naranjo = this.data.all_data.Naranjo;
      this.realizado = true;
      this.setData();
      this.form.disable();
    } else {
      this.realizado = false;
    }
  }

  submit() {
    this.form.controls['Id_Detalle'].setValue(this.data?.id_detalle);

    if (this.form.valid) {
      this.NaranjoService.send(this.form.value).subscribe({
        next: (req: any) => {
          this.mainService.showToast('Guardado Correctamente');
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

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  cancelar() {
    this.dialogRef.close();
  }

  tipo(option: string) {
    if (!this.realizado) {
      this.dialog.open(DialogConfirmacionComponent, {
        disableClose: true,
        width: '300px',
        data: { message: '¿Estas seguro de escoger el tipo: ' + option + '?' }
      })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.form.controls['Evento_Adverso_Tipo'].setValue(option);
          }
        }
        );
    } else {
      this.mainService.showToast("Borra el registro actual para poder editarlo", 'error');
    }
  }

  estado(option: string) {
    if (!this.realizado) {
      this.dialog.open(DialogConfirmacionComponent, {
        disableClose: true,
        width: '300px',
        data: { message: '¿Estas seguro de escoger el tipo: ' + option + '?' }
      })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.form.controls['Evento_Adverso_Estado'].setValue(option);
          }
        }
        );
    } else {
      this.mainService.showToast("Borra el registro actual para poder editarlo", 'error');
    }
  }

  mejoras() {
    const dialogRef = this.dialog.open(AggOportunityComponent, {
      width: '100%',
      height: '100%',
      disableClose: true
      ,
      data: this.data.all_data.Detalle.Id_Master
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  setData() {
    this.form.controls['Naranjo_1'].setValue(this.naranjo.Naranjo_1);
    this.form.controls['Naranjo_2'].setValue(this.naranjo.Naranjo_2);
    this.form.controls['Naranjo_3'].setValue(this.naranjo.Naranjo_3);
    this.form.controls['Naranjo_4'].setValue(this.naranjo.Naranjo_4);
    this.form.controls['Naranjo_5'].setValue(this.naranjo.Naranjo_5);
    this.form.controls['Naranjo_6'].setValue(this.naranjo.Naranjo_6);
    this.form.controls['Naranjo_7'].setValue(this.naranjo.Naranjo_7);
    this.form.controls['Naranjo_8'].setValue(this.naranjo.Naranjo_8);
    this.form.controls['Naranjo_9'].setValue(this.naranjo.Naranjo_9);
    this.form.controls['Naranjo_10'].setValue(this.naranjo.Naranjo_10);
    this.form.controls['Naranjo_Observaciones'].setValue(this.naranjo.Naranjo_Observaciones);
    this.form.controls['Evento_Adverso_Tipo'].setValue(this.naranjo.Evento_Adverso_Tipo);
    this.form.controls['Evento_Adverso_Estado'].setValue(this.naranjo.Evento_Adverso_Estado);
  }

  borrar() {
    this.NaranjoService.borrar(this.data?.id_detalle).subscribe({
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
}
