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
import { Eps } from 'src/app/modelos/Location/eps';
import { EpsService } from 'src/app/servicios/Location/eps.service';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from '../../baseComponent';

@Component({
  selector: 'app-eps-crear',
  templateUrl: './epsCrear.component.html',
  styleUrls: ['./epsCrear.component.scss'],
})
export class EpsCrearComponent extends BaseFormComponent implements OnInit {
  datos: Eps = new Eps();

  myForm = new FormGroup({
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
  });

  constructor(
    private myService: EpsService,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    @Inject(NB_WINDOW_CONTEXT) public data: any,
    public mainService: MainService
  ) {
    super();
  }

  ngOnInit(): void {}

  submit() {
    if (this.myForm.valid) {
      this.loadingMain = true;
      this.myService.create(this.myForm.value).subscribe({
        next: (req) => {
          this.loadingMain = false;
          this.mainService.showToast('Creado Correctamente');
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
