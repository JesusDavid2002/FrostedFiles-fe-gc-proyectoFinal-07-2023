import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Files } from 'src/app/models/files.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { CompartirComponent } from './details/compartir/compartir.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ModalCategoriaComponent } from './modal_categoria/modal-categoria.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fileList: Files[] = [
    {name: 'File 1',
      type: '.pdf',
      size: 600,
      date: '20/08/2020',
      isVisible: false
    }, {name: 'File 2',
    type: '.txt',
    size: 200,
    date: '21/08/2020',    
    isVisible: false
    }];

  selectedCategory: string = '';
  // categoriesList: Category[] = [
  //   { name: 'Category 1',
  //     subcategories: ['Subcategory 1.1', 'Subcategory 1.2']
  //   },
  //   { name: 'Category 2' },
  //   { name: 'Category 3' },
  //   { name: 'Category 4' }];
    
  constructor(private router: Router, private modalService: NgbModal, private fileService: FileService, private categoryService: CategoryService) {}

  ngOnInit(): void{
    this.fileService.setData(this.fileList);
    // this.categoryService.setData(this.categoriesList);

    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(index: number): void{
    
    this.fileList.forEach((file, i) => {
      if (i === index) {
        file.isVisible = !file.isVisible;

        let elements = document.getElementsByClassName('btn-files');
        for (let i = 0; i < elements.length; i++) {
          if (file.isVisible) {
            elements[i].removeAttribute('disabled');
          } else{
            elements[i].setAttribute('disabled', 'true');
          }
        }
      } else {
        file.isVisible = false;
      }
    });
  }

  openModalShare() {
    let modalRef = this.modalService.open(CompartirComponent);
    modalRef.componentInstance.name = 'nombre archivo que se compartirá';
  }

  openModalPermissions(){
    let modalRef = this.modalService.open(PermissionsComponent);
  }

  openModalCategory(){
    const modalRef = this.modalService.open(ModalCategoriaComponent);
    modalRef.componentInstance.name = 'nombre categoria que se creará';
  }
  
}
