import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent {
  @Input() name: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.form = new FormGroup({
      email: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl(''),
      fileName: new FormControl('')
    });
  }


  compartir() {
    console.log(this.name);
    console.log(this.form.value);
    this.activeModal.close('Close click');
  }
}
