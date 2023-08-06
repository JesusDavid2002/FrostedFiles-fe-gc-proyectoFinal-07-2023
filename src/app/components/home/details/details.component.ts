import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  characters : any = [];
  constructor(private modalService: NgbModal) {
  
		const modalRef = this.modalService.open(DetailsComponent);
    modalRef.componentInstance.name = 'World';
    // modalRef.componentInstance.character = character;
	}
}
