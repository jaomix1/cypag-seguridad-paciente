import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private toastrService: NbToastrService) {}

  /**
   * It takes a string and a status as parameters, and if the status is not 'error', it shows a toastr
   * with the string as the message
   * @param {string} sms - The message you want to display.
   * @param {string} [status=success] - 'success' - this is the default status, if you don't pass any
   * status, it will be success.
   */
  showToast(sms: string, status: string = 'success') {
    switch (status) {
      case 'error':
        this.toastrService.success(`Error`, `${sms}`);
        break;

      default:
        this.toastrService.success(`OK`, `${sms}`);
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
