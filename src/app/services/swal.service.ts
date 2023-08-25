import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  success(arg0: string) {
    throw new Error('Method not implemented.');
  }
  normalMessage(arg0: { icon: string; html: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private commentService: CommentService) { }

  async showInputAlert() {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Anartz",
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ]
      }
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }

  showDeleteAlertComment(id: any, callback: Function) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire({
      showCloseButton: true,
      title: '¿Estás seguro de borrar el comentario?',
      text: 'No podrás recuperar el comentario borrado',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        callback();
        this.showSuccessToast("Comentario borrado exitosamente");
      } else {
        console.log('cancel');
      }
    });
  }

  showDeleteAlertFile(id: number | null, callback: Function) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      showCloseButton: true,
      title: '¿Estás seguro de borrar este archivo?',
      text: 'No podrás recuperar el archivo borrado',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    })
      .then((result) => {
        if (result.value) {
          callback();
          this.showSuccessToast("Archivo borrado exitosamente");
        } else {
          console.log('cancel');
        }
      });
  }

  showDeleteAlertCategory(id: number | null, callback: Function) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      showCloseButton: true,
      title: '¿Estás seguro de borrar esta categoría?',
      text: 'No podrás recuperar la categoría borrada',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    })
      .then((result) => {
        if (result.value) {
          callback();
          this.showSuccessToast("Categoría borrada exitosamente");
        } else {
          console.log('cancel');
        }
      });
  }

  showDeleteAlertSubcategory(id: number | null, callback: Function) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      showCloseButton: true,
      title: '¿Estás seguro de borrar esta subcategoría?',
      text: 'No podrás recuperar la subcategoría borrada',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    })
      .then((result) => {
        if (result.value) {
          callback();
          this.showSuccessToast("Subcategoría borrada exitosamente");
        } else {
          console.log('cancel');
        }
      });
  }

  showDeleteAlertSubSubcategory(id: number | null, callback: Function) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      showCloseButton: true,
      title: '¿Estás seguro de borrar esta sub-subcategoría?',
      text: 'No podrás recuperar la subcategoría borrada',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: false
    })
      .then((result) => {
        if (result.value) {
          callback();
          this.showSuccessToast("Sub-Subcategoría borrada exitosamente");
        } else {
          console.log('cancel');
        }
      });
  }

  showSuccessToast(title: string, typeIcon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success', timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 2500,
      title: title
    });
  }


}
