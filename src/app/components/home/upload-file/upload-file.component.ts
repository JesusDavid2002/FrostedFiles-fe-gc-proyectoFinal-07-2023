import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() dataCategoriesUpload: Array<any> = [];

  ngOnInit(): void{}
} 
