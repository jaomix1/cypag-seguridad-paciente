import { Component, Inject, OnInit } from '@angular/core';
import { MsPqComponent } from 'src/app/componentes/index/investigaciones/ms-pq/ms-pq.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-investigacion',
  templateUrl: './select-investigacion.component.html',
  styleUrls: ['./select-investigacion.component.css']
})
export class SelectInvestigacionComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public guid: string,
  ) { 
  }

  ngOnInit(): void {
  }


  metodo(option: string){
    let object: any = {type: option, id: this.guid};
    const dialogRef = this.dialog.open(MsPqComponent, {
      width: '100%',
      height: '70%',
      data: object,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

}
