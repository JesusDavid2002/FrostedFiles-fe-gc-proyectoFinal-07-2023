import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirComponent } from './compartir/compartir.component';
import { CommentService } from 'src/app/services/comment.service';
import { FileService } from 'src/app/services/file.service';
import { SwalService } from 'src/app/services/swal.service';
import { Files } from 'src/app/models/files.model';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  comment: any;
  comments: any = [];

  email: string | null = null;
  fileNombre: string = '';
  file: Files = new Files();
  pdfUrl: any;
  pdfSrcPrueba = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  usuario: any = {};
  userRole: string | null = null;

  constructor(private modalService: NgbModal, public commentService: CommentService, public fileService: FileService, private swalService: SwalService,
    private userService: UserService) {
    this.comments = this.commentService.getComments();
  }

  ngOnInit(): void {
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
        this.loadComments();
        this.userRole = this.usuario.roles.nombre;
      }
    );
  }

  downloadPdfFromDatabase(nombre: string, extension: string) {
    this.fileService.getPDF(nombre).subscribe(
      (blob) => {
        // Crear un objeto URL a partir del Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace para descargar el PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = nombre + extension;
        document.body.appendChild(a);
        a.click();

        // Liberar el objeto URL
        window.URL.revokeObjectURL(url);

        this.registrarDescargar(nombre);
      });
  }

  fetchPdfFromDatabase(nombre: string) {
    this.fileService.getPDF(nombre).subscribe(
      (blob) => {
        this.pdfUrl = blob
      });
  }

  registrarDescargar(nombre: string) {
    let accion = {
      tipoAccion: 'descargar',
      fecha: new Date(),
      files: nombre
    };

    this.fileService.postDownloadData(accion).subscribe({
      next: (response) => {
        console.log('Descarga añadida a la grafica', response);
      },
      error: (error) => {
        console.error('Error al añadir', error);

      }
    });
  }

  openModalShare() {
    let selectedFiles = this.file;
    this.fileService.setSelectedFileName(selectedFiles.nombre);
    const modalRef = this.modalService.open(CompartirComponent);

    modalRef.componentInstance.name = selectedFiles;
    modalRef.componentInstance.selectedFile = this.file;
  }

  loadComments() {
    this.email = this.userService.getUserEmail();
    this.commentService.getComments().subscribe(
      (result) => {
        this.comments = result;
      });
  }

  sendComment() {
    console.log(this.email);
    if (this.email !== null && this.email !== undefined) {
      console.log(this.email);
      let fecha = new Date();
      let fechaFormateada = fecha.toISOString();
      let comment =
      {
        "id": null,
        "files": { "nombre": this.file.nombre },
        "fecha": fechaFormateada,
        "texto": this.comment
      }
      console.log(comment);
      this.commentService.addComment(comment).subscribe({
        next: (result) => {
          this.comments = result;
          this.loadComments();
        },
        error: catchError(error => {
          console.error('Error al obtener categorías:', error);
          throw error;
        })
      });
    }
  }

  onDeleteComment(id: number) {
    this.swalService.showDeleteAlertComment(id, () =>
      this.commentService.deleteCommentById(id).subscribe(
        (result) =>
          console.log(result)
      )
    );
  }
}
