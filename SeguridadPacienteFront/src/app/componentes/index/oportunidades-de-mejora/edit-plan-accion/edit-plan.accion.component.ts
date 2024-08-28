import { ActionService } from 'src/app/servicios/actions/action.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { MainService } from 'src/app/servicios/main.service';

@Component({
    selector: 'app-edit-plan.accion',
    templateUrl: './edit-plan.accion.component.html',
    styleUrls: ['./edit-plan.accion.component.css']
})
export class EditPlanAccionComponent implements OnInit {

    percent: number = 0;
    constructor(
        private ActionService: ActionService,
        public mainService: MainService,
        public dialogRef: MatDialogRef<EditPlanAccionComponent>,

        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.percent = this.data.porcentaje;
    }

    submit() {
        if (this.percent <= 100 && this.percent >= 0) {
            let object = {
                PlanId: this.data.id,
                PorcentajeMejora: this.percent
            }
            this.ActionService.edit(object).subscribe({
                next: (req: any) => {
                    this.mainService.showToast('Se actualizó correctamente');
                    this.dialogRef.close();

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

}
