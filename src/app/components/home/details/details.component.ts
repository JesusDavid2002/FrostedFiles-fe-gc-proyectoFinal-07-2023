import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';
import { FileService } from 'src/app/services/file.service';
import { SwalService } from 'src/app/services/swal.service';
import { Files } from 'src/app/models/files.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  comment : any;
  comments : any = [];
  
  fecha = new Date();
  fileNombre: string = '';
  file: Files = new Files();
  pdfUrl: any;
  pdfSrcPrueba = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


  constructor(private modalService: NgbModal, public commentService: CommentService, public fileService: FileService, private swalService: SwalService) {
    this.comments = this.commentService.getComments();
  }

  ngOnInit(): void{
    this.fileNombre = this.fileService.getSelectedFileName();
    this.fileService.getFilesByName(this.fileNombre).subscribe(
      (archivo: Files) => {
        this.file.nombre = archivo.nombre;
        this.file.extension = archivo.extension;
        this.file.tamano = archivo.tamano;
        this.file.fechaSubida = archivo.fechaSubida;
        this.file.visibilidad = archivo.visibilidad;
        this.file.categories = archivo.categories;
        this.file.subcategories = archivo.subcategories;
        this.file.contenido = archivo.contenido;
        
        this.fetchPdfFromDatabase(this.file.nombre);
        
      }
    );    
  }

  downloadPdfFromDatabase(nombre: string) {
    this.fileService.getPDF(nombre).subscribe(
    (blob) => {
      // Crear un objeto URL a partir del Blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace para descargar el PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = nombre; // Puedes establecer el nombre del archivo aquí
      document.body.appendChild(a);
      a.click();

      this.fileService.postDownloadData('descargar', this.fecha, nombre).subscribe(
        (result) => {
          console.log('Añadido correctamente a las estadisticas', result);
        }
      );
      
      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    });
  }

  fetchPdfFromDatabase(nombre: string) {
    this.fileService.getPDF(nombre).subscribe(
      (blob) => {
        this.pdfUrl = blob
      });
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
