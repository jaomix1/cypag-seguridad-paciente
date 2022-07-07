import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CombosLondresService } from 'src/app/servicios/combo/combos-londres.service';
@Component({
  selector: 'app-londres',
  templateUrl: './londres.component.html',
  styleUrls: ['./londres.component.css']
})
export class LondresComponent implements OnInit {

  type: any;
  combo: any;

  form = new FormGroup({
    pq1: new FormControl(''),
    pq2: new FormControl(''),
    pq3: new FormControl(''),
    pq4: new FormControl(''),
    pq5: new FormControl(''),
  });


  constructor(
    public dialogRef: MatDialogRef<LondresComponent>,
    public CombosLondresService: CombosLondresService
  ) { }

  ngOnInit(): void {
  }

  submit() {

  }

  cancelar(){
    this.dialogRef.close();
  }

  tipo(option: string){
    console.log(option)
  }

  estado(option: string){
    console.log(option)
  }
}
