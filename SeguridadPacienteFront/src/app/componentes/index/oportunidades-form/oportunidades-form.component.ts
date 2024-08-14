import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/servicios/main.service';
import { OpportunityService } from 'src/app/servicios/opportunity/opportunity.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { ResponsableService } from 'src/app/servicios/usuarios/responsable.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-oportunidades-form',
  templateUrl: './oportunidades-form.component.html',
  styleUrls: ['./oportunidades-form.component.css']
})
export class OportunidadesFormComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  public masterId: string;
  acciones: any = [];
  responsables: any = [];

  displayedColumns = ['Descripcion', 'Accion'];

  constructor(
    public mainService: MainService,
    public OpportunityService: OpportunityService,
    public UsersService: ResponsableService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
    public dialogRef: MatDialogRef<OportunidadesFormComponent>,) {
    this.masterId = guid;
  }

  form = new FormGroup({
    Code: new FormControl(''),
    Descripcion: new FormControl(null, [Validators.maxLength(500), Validators.required]),
    Responsable: new FormControl(null, [Validators.required]),
  });


  ngOnInit(): void {
    this.getResponsables();
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
    // if (this.mejoras.length > 0) {
    this.OpportunityService.create(this.form.value).subscribe({
      next: (req: any) => {
        this.mainService.showToast('Guardado Correctamente', 'success');
        this.dialogRef.close()
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      },
    });
    // }
  }


  sending: boolean = false;
  agregarAccion() {

  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.form, nameInput);
  }

  eliminar(codigo: any) {
    this.acciones = this.acciones.filter((item: any) => item.Codigo_Externo !== codigo)

  }
}
