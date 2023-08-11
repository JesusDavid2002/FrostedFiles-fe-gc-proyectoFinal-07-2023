import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent {
  @Input() name: any;
  formCategory: FormGroup;
  categoriesList: Category[] = [];



  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) {
    this.formCategory = new FormGroup({
      category: new FormControl(''),
      subcategory: new FormControl('')
    });
  }


  ngOnInit(): void{
    // this.categoriesList = this.categoryService.getData();
    this.categoryService.getData().subscribe(categories => {
    this.categoriesList = categories;
    });
  }

  
  crearCategoria() {
    // console.log(this.name);
    console.log(this.formCategory.get('category')?.value);
    let category = new Category();
    category.name = this.formCategory.get('category')?.value;
    this.categoryService.addCategory(category);
    this.activeModal.close('Close click');
  }
}
