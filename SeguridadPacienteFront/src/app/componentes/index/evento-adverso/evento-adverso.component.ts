import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evento-adverso',
  templateUrl: './evento-adverso.component.html',
  styleUrls: ['./evento-adverso.component.css']
})
export class EventoAdversoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tipo(option: string){
    console.log(option)
  }

  estado(option: string){
    console.log(option)
  }

}
