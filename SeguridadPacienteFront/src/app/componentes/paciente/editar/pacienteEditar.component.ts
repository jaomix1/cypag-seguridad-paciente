import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NbToastrService,
  NbWindowRef,
  NB_WINDOW_CONTEXT,
} from '@nebular/theme';
import { Paciente } from 'src/app/modelos/Paciente/paciente';
import { PacienteService } from 'src/app/servicios/Paciente/paciente.service';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from '../../baseComponent';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './pacienteEditar.component.html',
  styleUrls: ['./pacienteEditar.component.scss'],
})
export class PacienteEditarComponent
  extends BaseFormComponent
  implements OnInit
{
  datos: Paciente = new Paciente();

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
  });

  constructor(
    private myService: PacienteService,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    @Inject(NB_WINDOW_CONTEXT) public data: any,
    private mainService: MainService
  ) {
    super();
    this.cargarUno(data.dato);
  }

  ngOnInit(): void {}

  submit() {
    if (this.myForm.valid) {
      this.loadingMain = true;
      this.myService.edit(this.myForm.value).subscribe({
        next: (req) => {
          this.loadingMain = false;
          this.mainService.showToast('Editado Correctamente');
          this.datos = req;
          this.cancelar(true);
        },
        error: (err: string) => {
          this.loadingMain = false;
          this.mainService.showToast(err, 'error');
        },
        complete: () => (this.loadingMain = false),
      });
    }
  }

  cargarUno(dato: string): any {
    this.loadingMain = true;
    this.myService.get(dato).subscribe({
      next: (req) => {
        this.loadingMain = false;
        this.myForm.patchValue(req);
      },
      error: (err: string) => {
        this.loadingMain = false;
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
        this.loadingMain = false;
      },
    });
  }

  cancelar(status: boolean) {
    this.myForm.reset();
    this.windowRef.close({ status, req: this.datos });
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }
}
