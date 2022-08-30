import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private _snackBar: MatSnackBar) {}

  showToast(sms: string, status: string = 'success') {
    switch (status) {
      case 'error':
        this._snackBar.open(`Error: ` + sms, "", {duration: 5000, panelClass: ['snackbar-error'] } );
        break;
      case 'success':
          this._snackBar.open(sms, "", {duration: 3000 } );
          break;
      default:
        this._snackBar.open(sms , "", {duration: 3000 });
        break;
    }
  }

  /**
   * It checks if the form control has an error, and if it does, it returns a string with the error
   * message
   * @param {FormGroup} form - FormGroup: The form that contains the input to be validated.
   * @param {string} nameInput - string: The name of the input field.
   * @returns A string with the errors of the input.
   */
  checkInput(form: FormGroup, nameInput: string) {
    return (
      (form.controls[nameInput].errors?.['required']
        ? 'El campo es requerido | '
        : '') +
      (form.controls[nameInput].errors?.['maxlength']
        ? 'Se ha superado el max de caracteres permitidos | '
        : '') +
      (form.controls[nameInput].errors?.['max']
        ? 'Ingese una edad valida (0 a 105) | '
        : '') +
      (form.controls[nameInput].errors?.['min']
        ? 'Ingese una edad valida (0 a 105) | '
        : '') +
      (form.controls[nameInput].errors?.['pattern']
        ? 'El campo contiene caracteres no permitidos | '
        : '')
    );
  }

  /**
   * It returns true if the input is invalid and has been touched
   * @param {FormGroup} form - FormGroup - the form that we want to validate
   * @param {string} nameInput - The name of the input field you want to validate.
   * @returns A boolean value.
   */
  validateInput(form: FormGroup, nameInput: string) {
    return !form.controls[nameInput].valid && form.controls[nameInput].touched;
  }
}
