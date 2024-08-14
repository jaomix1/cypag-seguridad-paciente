import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MainService } from 'src/app/servicios/main.service';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';

@Component({
  selector: 'app-edit-oportunidad-mejora',
  templateUrl: './edit-oportunidad-mejora.component.html',
  styleUrls: ['./edit-oportunidad-mejora.component.css']
})
export class EditOportunidadMejoraComponent implements OnInit {

  datos: any;
  percent: number = 0;
  descripcion: string = '';
  responsable: string = '';
  responsables: any = [];


  constructor(
    private OpportunityService: OpportunityService,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public UsersService: ResponsableService,
    public dialogRef: MatDialogRef<EditOportunidadMejoraComponent> // Inyección de MatDialogRef

  ) { }

  ngOnInit(): void {
    this.getResponsables();
    this.getOportunidad();
  }

  getOportunidad() {
    this.OpportunityService.get({ Id: this.guid }).subscribe({
      next: (req: any) => {
        console.log(req);
        this.datos = req[0];
        this.percent = this.datos.Porcentaje_Mejora;
        this.descripcion = this.datos.Descripcion;
        this.responsable = this.datos.Responsable;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      },
      complete: () => {
      }
    });
  }

  getResponsables() {
    this.UsersService.get().subscribe({
      next: (req) => {
        this.responsables = req;
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  submit() {
    if (this.percent <= 100 && this.percent >= 0) {
      let object = {
        Id: this.datos.Id,
        Porcentaje_Mejora: this.percent,
        Descripcion: this.descripcion,
      }
      this.OpportunityService.edit(object).subscribe({
        next: (req: any) => {
          this.mainService.showToast(req.message);
        },
        error: (err: string) => {
          this.mainService.showToast(err, 'error');
        },
        complete: () => {
        }
      });
    } else {
      this.mainService.showToast("No se puede ingresar un porcentaje mayor a 100 o menor a 0", 'error');
    }
  }

  cancel() {
    this.mainService.showToast("Operacion Cancelada")
    this.dialogRef.close(false); // Cierra el modal
  }

}
