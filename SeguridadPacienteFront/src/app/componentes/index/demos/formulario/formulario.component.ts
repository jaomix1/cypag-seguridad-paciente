import { Component, OnInit } from '@angular/core';
import { FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from 'src/app/componentes/baseComponent';
import { DemoService } from 'src/app/servicios/demo/demo.service';
import { Demo } from 'src/app/modelos/demo/demo';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent extends BaseFormComponent implements OnInit {  
  datos: Demo = new Demo();


  myForm = new FormGroup({
    company:  new FormControl(''),
    firstName:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    address:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    address2:  new FormControl(''),
    city:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.latin),
    ]),
    postalCode:  new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern(this.number),
    ]),
    shipping:  new FormControl('free', [
      Validators.required,
    ]),
  });

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
  ];

  constructor(
    private myService: DemoService,
    public mainService: MainService) {
    super();
  }
  
  ngOnInit(): void {}

  submit(): void {
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
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }
}
