import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NbWindowRef, NB_WINDOW_CONTEXT } from '@nebular/theme';
import { Regional } from 'src/app/modelos/Location/regional';
import { RegionalService } from 'src/app/servicios/Location/regional.service';
import { BaseFormComponent } from '../../baseComponent';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent extends BaseFormComponent implements OnInit {
  constructor(
    protected windowRef: NbWindowRef,
    @Inject(NB_WINDOW_CONTEXT) public data: any
  ) {
    super();
  }

  ngOnInit(): void {}

  Eliminar() {
    this.windowRef.close(true);
  }

  cancelar() {
    this.windowRef.close(false);
  }
}
