import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from '../baseComponent';
import { QueryService } from 'src/app/servicios/query/search.service';
import { MainService } from 'src/app/servicios/main.service';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent extends BaseFormComponent implements OnInit {

  constructor(
    public mainService: MainService,
    public Service: QueryService,
    private ruta: ActivatedRoute,
    private router: Router,
  ) {
    super()
  }

  iniciales:any;
  token: string = "";
  data:any;

  ngOnInit(): void {
    //Obtener datos por la ruta
    if(this.ruta.snapshot.params['token']){
      this.token = this.ruta.snapshot.params['token'];
      this.getAllData();
    }
  }

  getAllData() {
    this.Service.get(this.token).subscribe({
      next: (req) => {
        this.data = req;

        //Sacar iniciales
        let array = this.data.Master.Nombre_Paciente.split(" ");
        let total = array.length;
        this.iniciales = "";
        for (var i = 0; i < total; this.iniciales += array[i][0], i++);
      },
      error: (err: string) => {
        this.mainService.showToast(err, 'error');
      }
    });
  }

  download() {

  }

}
