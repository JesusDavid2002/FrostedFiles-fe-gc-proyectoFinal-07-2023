import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent {

  @Input() name: any;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fileService: FileService) {
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

    this.fileService.compartirArchivo(this.form.value).subscribe(
      (response) => {
        console.log("Solicitud mandada: ", response);
        
      },
      (error) =>{
        console.log("Solicitud rechazada:", error);
      }
    );

    this.activeModal.close('Close click');
  }
  
}
