import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Testigo {
  name: string;
}

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})


export class DetallesComponent implements OnInit {
  tamano : any = { col : 1, row: 1};
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  responsables: Testigo[] = [{name: 'Jhonatan'}];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor( private _formBuilder: FormBuilder) { }

  data: any = "Esta es una data de prueba";

  ngOnInit(): void {
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.responsables.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: Testigo): void {
    const index = this.responsables.indexOf(fruit);
    if (index >= 0) {
      this.responsables.splice(index, 1);
    }
  }
}
