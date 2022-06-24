//import Swal from 'sweetalert2';

export class BaseFormComponent {
  public latin: RegExp = /^[\wÀ-ú\s]+$/;
  public number: RegExp = /^[0-9]+$/;
  public loadingMain: boolean = false;
  public loading: boolean = false;
  
  constructor() {

  }

  // // fechaHoy() {
  // //   const currentDate = new Date();
  // //   console.log(currentDate.toISOString().substring(0, 10))
  // //   return currentDate.toISOString().substring(0, 10)
  // // }

  // /**
  //  * 
  //  * @param daysToAdd 
  //  * @param zone default value 5 colombia, cambiar si esta en la nube el servidor
  //  * @returns 
  //  */
  // fechaHoyMasDias(daysToAdd: number, zone: number = 5) {
  //   const currentDate = new Date();
  //   currentDate.setDate(currentDate.getDate() + daysToAdd);
  //   return currentDate.toISOString().substring(0, 10) + "T0" + zone + ":00:00.000Z"; // ojo + "t para servidores colombia"
  // }

  // diaInicialMes(){
  //   var dias = new Date().getDate() -1;
  //   return this.fechaHoyMasDias(-dias);
  // }

}