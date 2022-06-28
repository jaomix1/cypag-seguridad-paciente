import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-londres',
  templateUrl: './londres.component.html',
  styleUrls: ['./londres.component.css']
})
export class LondresComponent implements OnInit {

  form = new FormGroup({
    pq1: new FormControl(''),
    pq2: new FormControl(''),
    pq3: new FormControl(''),
    pq4: new FormControl(''),
    pq5: new FormControl(''),
  });


  constructor() { }

  ngOnInit(): void {
  }

  submit() {

  }

  cancelar(){

  }

}
