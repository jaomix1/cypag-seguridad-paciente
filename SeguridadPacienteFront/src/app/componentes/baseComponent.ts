import Swal from 'sweetalert2';

export class BaseFormComponent {
  public loanding: boolean = false;
  public loanding2: boolean = false;

  constructor() {

  }

  error(error: string) {
    Swal.fire({
      title: 'Upp!',
      text: error,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

}