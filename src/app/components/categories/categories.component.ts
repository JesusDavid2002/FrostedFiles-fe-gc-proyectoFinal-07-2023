import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  
  categoriesList: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void{
    // this.categoriesList = this.categoryService.getData();
    this.categoryService.getData().subscribe(categories => {
    this.categoriesList = categories;
    });
  }

  update(categoryName?: string, subcategoryName?: string){
    if( categoryName && !subcategoryName ){
      let path = `public/multimedia/${categoryName}`;
      this.categoryService.updateCategory(path);
    } else if( categoryName && subcategoryName ){
      let path = `public/multimedia/${categoryName}/${subcategoryName}`;
      this.categoryService.updateCategory(path);
      console.log(path);
    }
  }
}
