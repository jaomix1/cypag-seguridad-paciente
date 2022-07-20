import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-main',
  templateUrl: './dialog-main.component.html',
  styleUrls: ['./dialog-main.component.css']
})
export class DialogMainComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DialogMainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  copiar(): void {

  }

}
