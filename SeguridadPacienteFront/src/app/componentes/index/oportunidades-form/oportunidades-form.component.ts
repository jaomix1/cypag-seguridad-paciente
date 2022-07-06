import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-oportunidades-form',
  templateUrl: './oportunidades-form.component.html',
  styleUrls: ['./oportunidades-form.component.css']
})
export class OportunidadesFormComponent implements OnInit {

  constructor(
    public mainService: MainService,
    public OpportunityService: OpportunityService
  ) { }

  form = new FormGroup({
    Id_Detalle: new FormControl(''),
    Ins: new FormControl('5 M´s'),
    Code: new FormControl(''),
    Cual: new FormControl(''),
    Responsables: new FormControl(''),
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  responsables: any = [];

  ngOnInit(): void {
  }


  submit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.OpportunityService.create(this.form.value).subscribe({
        next: (req:any) => {
          this.mainService.showToast('Guardado Correctamente', 'success');
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
      });
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.responsables.push(value);
    }
    event.chipInput!.clear();
  }

  remove(t: any): void {
    const index = this.responsables.indexOf(t);
    if (index >= 0) {
      this.responsables.splice(index, 1);
    }
  }

}
