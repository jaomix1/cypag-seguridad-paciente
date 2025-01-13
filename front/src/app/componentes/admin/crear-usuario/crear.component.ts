import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormComponent } from '../../baseComponent';
import { MainService } from 'src/app/servicios/main.service';
import { Usuario } from 'src/app/modelos/user';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent extends BaseFormComponent {

  hidePassword = true;

  pacienteForm = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    nombreCompleto: new FormControl('', [Validators.required]),
    perfilId: new FormControl('Comun', [Validators.required]),
    passwords: new FormGroup({
      clave: new FormControl('', [Validators.required]),
      repetirClave: new FormControl('', [Validators.required]),
    }, { validators: this.passwordConfirming })
  })

  constructor(
    private us: UsuarioService,
    public dialogRef: MatDialogRef<CrearComponent>,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

    super();
  }

  onNoClick(): void {
    this.pacienteForm.reset();
    this.dialogRef.close();
  }

  passwordConfirming(c: AbstractControl): any {
    const clave = c.get('clave');
    const repetirClave = c.get('repetirClave');
    if (clave && repetirClave && clave.value !== repetirClave.value) {
      return { invalid: true };
    }
  }

  guardar(): void {
    if (this.pacienteForm.valid) {
      this.loanding = true;
      let usuario = new Usuario;
      usuario.correo = this.pacienteForm.value.correo;
      usuario.usuario = this.pacienteForm.value.usuario;
      usuario.clave = this.pacienteForm.value.passwords.clave;
      usuario.perfilId = this.pacienteForm.value.perfilId;
      usuario.nombreCompleto = this.pacienteForm.value.nombreCompleto;
      this.us.crearUsuario(usuario)
        .subscribe((req: any) => {
          this.loanding = false;
          this.dialogRef.close(req);
        }, (error: string) => {
          this.loanding = false;
          this.mainService.showToast(error, 'error');
        }
        )
    }
  }
}
