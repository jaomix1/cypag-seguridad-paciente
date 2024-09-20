import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ComboService } from 'src/app/servicios/combo/combo.service';
import { MainService } from 'src/app/servicios/main.service';
import { BaseFormComponent } from '../../baseComponent';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { OpportunityComponent } from '../opportunity/opportunity.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ExportarService } from 'src/app/servicios/exportar/search.service';
import { ExcelService } from 'src/app/servicios/ExcelService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  // novedades: Combo[] = [];
  // empresas: Combo[] = [];
  // sedes: Combo[] = [];
  // dataSource = new MatTableDataSource();

  maxDate: Date;

  myForm = new FormGroup({
    Start_Date: new FormControl(null, [Validators.required]),
    End_Date: new FormControl(null, [Validators.required])
  });

  constructor(
    private ExportarService: ExportarService,
    public mainService: MainService,
    private comboService: ComboService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private excelService: ExcelService
  ) {
    super();

    this.maxDate = new Date();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  }

  submit(): void {

    if (this.myForm.valid) {
      this.myForm.disable();
      this.loadingMain = true;
      const currentDate = new Date(this.myForm.value.Start_Date).toISOString().substring(0, 10);
      const currentDate2 = new Date(this.myForm.value.End_Date).toISOString().substring(0, 10);
      window.open(environment.apiUrl + "/v1/api/exportar/excel/" + currentDate + "/" + currentDate2, "_blank");
      this.loadingMain = false;
      this.myForm.enable();

    }
  }


  cancelar() {
    this.myForm.reset();
  }

  validate(nameInput: string) {
    return this.mainService.validateInput(this.myForm, nameInput);
  }

  check(nameInput: string) {
    return this.mainService.checkInput(this.myForm, nameInput);
  }


}
