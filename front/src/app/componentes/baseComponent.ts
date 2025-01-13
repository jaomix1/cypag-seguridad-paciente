export class BaseFormComponent {
  public loanding: boolean = false;
  public loanding2: boolean = false;
  public loanding3: boolean = false;

  public latin: RegExp = /^[\wÀ-ú\s,.]+$/;
  public latinExt: RegExp = /^[\wÀ-ú\s,.?¡¿!_-\s*;:]+$/;
  public number: RegExp = /^[0-9]+$/;
  public loadingMain: boolean = false;
  public loading: boolean = false;


  getErrorMessage(dato: string) {
    switch (dato) {
      case 'user':
        return 'Debes ingresar un usuario';
        break;
      case 'pass':
        return 'Debes ingresar una contraseña';
        break;
      case 'email':
        return 'Debes ingresar un correo valido';
        break;
      case 'rpass':
        return '';
        break;
      default:
        return 'Falta el campo: ' + dato;
        break;
    }
  }

}
