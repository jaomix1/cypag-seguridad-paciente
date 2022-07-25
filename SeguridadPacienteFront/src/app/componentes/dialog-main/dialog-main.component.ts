import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MainService } from 'src/app/servicios/main.service';

@Component({
  selector: 'app-dialog-main',
  templateUrl: './dialog-main.component.html',
  styleUrls: ['./dialog-main.component.css']
})
export class DialogMainComponent implements OnInit {

  constructor(
    private clipboard: Clipboard,
    public mainService: MainService,
    public dialog: MatDialogRef<DialogMainComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  copiar(): void {

  }

  copyToClipboard(): void {
    this.clipboard.copy(this.data.response.Id);

    this.mainService.showToast('Creado Correctamente');
  }

}
