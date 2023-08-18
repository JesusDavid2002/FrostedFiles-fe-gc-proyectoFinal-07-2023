import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  comment : any;
  comments : any = [];
  visitCount: number = 0;

  constructor(private modalService: NgbModal, public commentService: CommentService, public fileService: FileService) {
    console.log(this.commentService.getComments());
    this.comments = this.commentService.getComments();
    this.visitCount = fileService.getVisitCount();
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

  deleteComment(id: any) {
    this.commentService.deleteComment(id);
  }

}



		// const modalRef = this.modalService.open(DetailsComponent);
