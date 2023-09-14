import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Files } from 'src/app/models/files.model';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.css']
})
export class UpdateFileComponent {

  fileNombre: string = '';
  file: Files = new Files();
  pdfurl = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  pdfSrcPrueba = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private fileService: FileService, private route: ActivatedRoute, private router: Router, private http: HttpClient,) {}

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
        
        
      }
    );    
    this.fetchPdfFromDatabase(this.fileNombre);
  }

  fetchPdfFromDatabase(nombre: string) {
      this.fileService.getPDF(nombre).subscribe({
        next: (pdfBytes: any) => {
          let pdfUrl = URL.createObjectURL(pdfBytes);
          this.pdfurl = pdfUrl;
          console.log(pdfUrl);
          
        },
        error: (error: any) => {
          console.error('Error al obtener el PDF desde la base de datos:', error);
        }
      });
  }
  
  modifyFile(): void{
    let datosNuevos = {};
    if(this.file.visibilidad == true){
      datosNuevos = {
        nombre: this.file.nombre,
        visibilidad: true
      };
      
    } else {
      datosNuevos = {
        nombre: this.file.nombre,
        visibilidad: false
      };
    }

    this.fileService.updateFiles(this.fileNombre, datosNuevos).subscribe(
      result => {
        this.router.navigate(['/home']);
        console.log(result);
      });
  }

}
