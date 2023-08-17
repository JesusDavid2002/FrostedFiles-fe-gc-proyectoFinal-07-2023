import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';

import Swal from 'sweetalert2';
import { id } from '@swimlane/ngx-charts';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  comment: any;
  comments: any = [];

  constructor(
    private modalService: NgbModal,
    public commentService: CommentService,
    private swalService: SwalService
  ) {
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
    };
    this.commentService.addComment(comment);
  }

  // async data() {
  //   const { value: formValues } = await Swal.fire({
  //     title: 'Multiple inputs',
  //     html:
  //       '<input id="swal-input1" class="swal2-input">' +
  //       '<input id="swal-input2" class="swal2-input">',
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Anartz",
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       return [
  //         (document.getElementById('swal-input1') as HTMLInputElement).value,
  //         (document.getElementById('swal-input2') as HTMLInputElement).value
  //       ]
  //     }
  //   })

  //   if (formValues) {
  //     Swal.fire(JSON.stringify(formValues));
  //   }
  // }

  onDeleteComment(id: any) {
    this.swalService.showDeleteAlertComment(id, () =>
      this.commentService.deleteComment(id)
    );
  }
}
