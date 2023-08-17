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
import { SwalService } from 'src/app/services/swal.service';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fileList: Files[] = [
    {
      id: 1,
      name: 'CV Ejemplo',
      type: '.pdf',
      size: 600,
      date: '20/08/2020',
      isVisible: false
    }, 
    {
      id: 2,
      name: 'Texto de compra',
      type: '.txt',
      size: 200,
      date: '21/08/2020',    
      isVisible: false
    },
    {
      id: 3,
      name: 'Musica3',
      type: '.mp3',
      size: 700,
      date: '21/08/2021',    
      isVisible: false
    },
    {
      id: 4,
      name: 'Extension rara',
      type: '.cir',
      size: 700,
      date: '21/08/2021',    
      isVisible: false
    },
  ];
  
  

  selectedCategory: string = '';
  selectedFileIndex: number | null = null; 

    
  constructor(private router: Router, private modalService: NgbModal, private fileService: FileService, private categoryService: CategoryService, private swalService: SwalService) {}

  ngOnInit(): void{
    this.fileService.setData(this.fileList);
    // this.categoryService.setData(this.categoriesList);

    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  getIconSource(fileType: string | undefined): string {
    // Mapa de extension de archivo por imagen
    const iconMappings: Record<string, string> = {
        '.pdf': 'pdf.png',
        '.txt': 'txt.png',
        '.png': 'img.png',
        '.jpg': 'img.png',
        '.mp3': 'mp3.png',
    };

    const defaultIcon = 'text.png'; // Icono por defecto

    return `../../../assets/img/icons/${iconMappings[fileType || ''] || defaultIcon}`;
}

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(index: number): void{
    this.selectedFileIndex = index;
    console.log('Archivo seleccionado con índice:', this.selectedFileIndex);
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

  onDeleteFile() {
    console.log('Método onDeleteFile llamado');
    console.log("this es:", this);
    console.log("this.selectedFileIndex es:", this.selectedFileIndex);
  
    if (this.selectedFileIndex !== null) {
      this.swalService.showDeleteAlertFile(this.selectedFileIndex, () => {
        console.log('Callback de Swal ejecutado');
        this.fileList.splice(this.selectedFileIndex!, 1);
        this.selectedFileIndex = null;
      });
    }
  }
}