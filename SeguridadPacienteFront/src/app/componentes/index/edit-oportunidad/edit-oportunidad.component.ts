import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MainService } from 'src/app/servicios/main.service';

@Component({
  selector: 'app-edit-oportunidad',
  templateUrl: './edit-oportunidad.component.html',
  styleUrls: ['./edit-oportunidad.component.css']
})
export class EditOportunidadComponent implements OnInit {

  datos:any;
  percent: number = 0;
  constructor(
    private OpportunityService: OpportunityService,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
  ) { }

  ngOnInit(): void {
    this.getOportunidad();
  }

  getOportunidad() {
    let object = {
      Id: this.guid,
      Codigo_Externo: null,
      Id_Master: null,
      Start_Date: null,
      End_Date: null,
      Responsable: null
  }
    this.OpportunityService.getAll(object).subscribe({
      next: (req:any) => {
        this.datos = req[0];
        console.log(this.datos)
        this.percent = this.datos.Porcentaje_Mejora;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
      }
    });
  }

  submit(){
    if(this.percent <= 100 && this.percent >= 0){
      let object = {
        Id: this.datos.Id,
        Porcentaje_Mejora: this.percent
      }
      this.OpportunityService.edit(object).subscribe({
        next: (req:any) => {
          this.mainService.showToast(req.message);
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
        complete: () => {
        }
      });
    }else{
      this.mainService.showToast("No se puede ingresar un porcentaje mayor a 100 o menor a 0", 'error');
    }
  }

}
