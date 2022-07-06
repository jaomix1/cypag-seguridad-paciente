import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OportunidadesFormComponent } from '../../oportunidades-form/oportunidades-form.component';

@Component({
  selector: 'app-evento-adverso',
  templateUrl: './evento-adverso.component.html',
  styleUrls: ['./evento-adverso.component.css']
})
export class EventoAdversoComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  tipo(option: string){
    console.log(option)
  }

  estado(option: string){
    console.log(option)
  }


  mejoras(){
    const dialogRef = this.dialog.open(OportunidadesFormComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
