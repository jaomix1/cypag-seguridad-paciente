import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  iniciales:any;
  ngOnInit(): void {
    

    let array = this.data.Master.Nombre_Paciente.split(" ");
    let total = array.length;
    this.iniciales = "";
    for (var i = 0; i < total; this.iniciales += array[i][0], i++);
    console.log(this.iniciales); 
    console.log(this.data)
  }

  download() {  

  }

}
