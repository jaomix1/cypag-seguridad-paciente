import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmacion',
  templateUrl: './dialog-confirmacion.component.html',
  styleUrls: ['./dialog-confirmacion.component.css']
})
export class DialogConfirmacionComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<DialogConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  observation: String = "";

  ngOnInit() {
  }

  close(): void {
    this.dialog.close(false);
  }
  confirm(): void {
    this.dialog.close(true);
  }

}
