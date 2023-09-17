import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Files } from 'src/app/models/files.model';
import { ModeloCompartir } from 'src/app/models/modelo-compartir.model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent {
  modelo: ModeloCompartir = new ModeloCompartir();
  @Input() selectedFile!: Files; 

  constructor(public activeModal: NgbActiveModal, private fileService: FileService, private route: ActivatedRoute) {}
    
  ngOnInit(){
    this.modelo.setArchivoFromSelectedFile(this.selectedFile);
  }

  compartir() {         
    this.fileService.postCompartir(this.modelo).subscribe({
      next: (response) => {
        console.log('compartido', response);
      },
      error: (error) => {
        console.log('error', error);
        
      }
    });
      
    this.activeModal.close('Close click'); 
    }

}

