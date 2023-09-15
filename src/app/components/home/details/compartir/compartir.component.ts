import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Files } from 'src/app/models/files.model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent {

  file: Files = new Files;
  fileName: string = '';
  selectedFile: any;

  constructor(public activeModal: NgbActiveModal, private fileService: FileService, private route: ActivatedRoute) {}
  
  ngOnInit():void{
    this.route.params.subscribe(
      params => {
        this.fileName = params['nombre'];
      }
    );

    this.fileService.getFilesByName(this.fileName).subscribe(
      result => {
        this.file = result;
      }
    );
    console.log(this.file);
    
  }

  
  compartir() {    
    
    console.log(this.file);
    console.log(this.fileName);
    
    
      let formData = new FormData();
      // formData.append('destinatario', destinatario);
      // formData.append('asunto', this.form.get('destinatario')?.value);
      // formData.append('mensaje', this.form.get('destinatario')?.value);
      
      if(this.file){
        formData.append('file', this.selectedFile);
      }
      console.log(this.selectedFile);
      
    this.fileService.compartirArchivo(formData).subscribe({
      next: (response) => {
        console.log("Solicitud mandada: ", response);
        
      },
      error: (error) =>{
        console.log("Solicitud rechazada:", error);
      }
    });
  
    this.activeModal.close('Close click');
    
  }
}
