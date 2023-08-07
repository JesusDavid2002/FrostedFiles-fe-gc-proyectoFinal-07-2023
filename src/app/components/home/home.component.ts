import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedCategory: string = '';
  categoriesList: Category[] = [
    { name: 'Category 1',
      subcategories: ['Subcategory 1.1', 'Subcategory 1.2']
    },
    { name: 'Category 2' },
    { name: 'Category 3' },
    { name: 'Category 4' }];
    
  constructor(private router: Router, protected categoryService: CategoryService) {}

  ngOnInit(): void{
    this.categoryService.setData(this.categoriesList);

    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(){
    document.getElementById('btn-files')?.removeAttribute('disabled');
    document.getElementById('btn-files2')?.removeAttribute('disabled');
    document.getElementById('btn-files3')?.removeAttribute('disabled');
  }

}
