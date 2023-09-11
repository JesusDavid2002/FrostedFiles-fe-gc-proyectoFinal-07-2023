import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Files } from 'src/app/models/files.model';
import { CategoryService } from 'src/app/services/category.service';  
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  categoriesList: Category[] = [];
  selectedFiles: File[] = [];

  constructor(private categoryService: CategoryService, private fileService: FileService, private router: Router) {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categoriesList = result;
    });
  }
  
  createFile(): void{
    if (this.selectedFiles.length === 0) {
      console.error('No se han seleccionado archivos.');
      return;
    }
    

    this.selectedFiles.forEach((file) => {
      let fileData: Files = new Files();
      let fileExtension = file.name.split('.').pop();
      let fileDate = new Date();

      fileData.nombre = file.name;
      fileData.extension = fileExtension ? fileExtension : '';
      fileData.tamano = file.size;
      fileData.fechaSubida = fileDate.toISOString();
      fileData.visibilidad = true;

      this.fileService.postFiles(fileData, file).subscribe({
        next: (response) => {
          console.log('Archivo subido: ', response);
        },
        error: (error) => {
          console.error('Error al subir archivo: ', error);
        },
      });
    });
    this.router.navigateByUrl("/home");
  }

  // Utilizando el metodo onFileDropped y el evento dragEvent (arrastrar y soltar).
  // Utilizamos el metodo preventDefault() para evitar que el navegador haga su accion predeterminada
  onFileDropped(event: DragEvent){
    event.preventDefault();
    // Almacenamos todos los ficheros en files y los vamos recorriendo 1 a 1 y subiendo al array de objetos selectedFiles
    let files = event.dataTransfer?.files;
    if(files && files.length > 0){
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
  
  onDragOver(event: DragEvent){
    event.preventDefault();
  }

  // Utilizando un input de tipo file y el event podemos subir archivos en vez de arrastrandolos de forma manual
  onFileSelected(event: Event){
    let elements = event.target as HTMLInputElement;
    if(elements.files && elements.files.length > 0){
      let files: FileList = elements.files;
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
} 
