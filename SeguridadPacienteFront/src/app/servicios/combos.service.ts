import { Injectable } from '@angular/core';
import { Combo, ComboEmpresa, ComboSede, ComboText} from '../modelos/Combos/combo';

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  //combos
  public comboSiNo: ComboText[] = [
    {
      Id: "si",
      Descripcion: "Sí"
    },
    {
      Id: "no",
      Descripcion: "No"
    }
  ];
  public comboSexo : ComboText[] = [
    {
      Id: "Masculino",
      Descripcion: "Masculino"
    },
    {
      Id: "Femenino",
      Descripcion: "Femenino"
    }
  ];
  public comboSeveridad : ComboText[] = [
    {
      Id: "leve",
      Descripcion: "Leve"
    },
    {
      Id: "Moderado",
      Descripcion: "Moderado"
    },
    {
      Id: "Grave",
      Descripcion: "Grave"
    }
  ];
  public comboSedes : ComboSede[] = [];
  public comboEmpresas : ComboEmpresa[] = [];
  public comboIdentificacion : Combo[] = [];
  public comboNovedades : ComboText[] = [];

  constructor() { }
}
