import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { M5Component } from '../m5/m5.component';
import { P5Component } from '../p5/p5.component';
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


  m5() {
    const dialogRef = this.dialog.open(M5Component, {
      width: '100%',
      height: '100%',
      disableClose: true
      ,
      data: this.guid,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  p5() {
    const dialogRef = this.dialog.open(P5Component, {
      width: '100%',
      height: '100%',
      disableClose: true
      ,
      data: this.guid,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

}
