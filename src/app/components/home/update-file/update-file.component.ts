import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Files } from 'src/app/models/files.model';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.css']
})
export class UpdateFileComponent {

  fileId: number = 1;
  file: Files = new Files;
  categoriesList: Category[] = [];

  constructor(private categoryService: CategoryService, private fileService: FileService, private route: ActivatedRoute) {
    this.categoryService.getData().subscribe(categories => {
      this.categoriesList = categories;
});  }

  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.fileId = params ['id'];
    });

    this.fileService.getById(this.fileId).subscribe(result =>{
      this.file = result;
    })
  }
}
