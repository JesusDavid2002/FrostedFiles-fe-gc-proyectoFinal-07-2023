import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() dataCategoriesUpload: Array<any> = [];
  selectedFiles: File[] = [];

  ngOnInit(): void{}

  onFileDropped(event: DragEvent){
    event.preventDefault();
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

  onFileSelected(event: Event){
    let elements = event.target as HTMLInputElement;
    if(elements.files && elements.files.length > 0){
      let files: FileList = elements.files;
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }

  uploadFile(file: File){

  }
} 
