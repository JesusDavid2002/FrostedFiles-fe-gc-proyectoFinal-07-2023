import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  
  categoriesList: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void{
    this.categoriesList = this.categoryService.getData();
  }
}
