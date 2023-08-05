import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categoriesList: any[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' }];
    
  constructor(private router: Router, protected categoryService: CategoryService) {}

  ngOnInit(): void{
    this.categoryService.setData(this.categoriesList);
  }

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(){}
}
