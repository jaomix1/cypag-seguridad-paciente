import { Component, OnInit } from '@angular/core';
import { MsPqComponent } from 'src/app/componentes/index/investigaciones/ms-pq/ms-pq.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-investigacion',
  templateUrl: './select-investigacion.component.html',
  styleUrls: ['./select-investigacion.component.css']
})
export class SelectInvestigacionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  metodo(option: string){
    console.log(option)
    const dialogRef = this.dialog.open(MsPqComponent, {
      width: '100%',
      height: '70%',
      data: option,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

}
