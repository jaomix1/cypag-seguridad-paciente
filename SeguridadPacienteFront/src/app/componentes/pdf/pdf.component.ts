import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from '../baseComponent';
import { QueryService } from 'src/app/servicios/query/search.service';
import { MainService } from 'src/app/servicios/main.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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
    this.loadingMain = true;
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 1
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.token}_Londres.pdf`);
      this.loadingMain = false;
    });
  }

}
