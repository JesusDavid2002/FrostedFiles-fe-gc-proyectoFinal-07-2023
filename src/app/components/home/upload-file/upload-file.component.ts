import { Component, Input } from '@angular/core';
  
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  public categoriesList: Array<any> = [];
  selectedFiles: File[] = [];

  ngOnInit(): void {
    this.categoriesList= [
    {
      name:'Categoria 1'
    }, 
    {
      name: 'Categoria 2'
    }
  ];}

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

  uploadFile(){
  }
} 
