import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  comment : any;
  comments : any = [];

  constructor(private modalService: NgbModal, public commentService: CommentService) {
    console.log(this.commentService.getComments());
    this.comments = this.commentService.getComments();
  }
  
  openModalShare() {
    const modalRef = this.modalService.open(CompartirComponent);
    modalRef.componentInstance.name = 'nombre archivo que se compartirá';
  }

  sendComment() {
    let comment = {
      id: this.comments.length + 1,
      img: '',
      author: 'John Doe',
      date: '15-05-2015',
      text: this.comment,
    }
    this.commentService.addComment(comment);
  }

  async data() {
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
    })

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }

  deleteComment(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
      {
        showCloseButton: true,
        title: '¿Estás seguro de borrar el comentario?',
        text: 'No podrás recuperar el comentario borrado',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false
      }
    ).then((result) => {
      if (result.value) {
        this.commentService.deleteComment(id);
        this.toast();
      } else {
        console.log('cancel');
      }
    });
  }

  toast(typeIcon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success', timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 2500,
      title: 'Comentario borrado exitosamente'
    })
}


}
