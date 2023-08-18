import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';

import Swal from 'sweetalert2';

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

  onDeleteComment(id: any) {
    this.swalService.showDeleteAlertComment(id, () =>
      this.commentService.deleteComment(id)
    );
  }
}
