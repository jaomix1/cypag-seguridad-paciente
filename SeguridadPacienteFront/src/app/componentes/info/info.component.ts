import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CombosLondresService } from 'src/app/servicios/combo/combos-londres.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public CombosLondresService: CombosLondresService
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialog.close(false);
  }

}
