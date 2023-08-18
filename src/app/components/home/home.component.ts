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
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('caida', [
      state('iniciar', style({
        transform: 'translateY(0)'
      })),
      state('detener', style({
        transform: 'translateY(-100%)'
      })),
      transition('detener => iniciar', [
        animate('3s ease-in')
      ])
    ])
  ]
})
export class HomeComponent {
  fileList: Files[] = [
    {
      name: 'CV Ejemplo',
      type: '.pdf',
      size: 600,
      date: '20/08/2020',
      isVisible: false
    }, 
    {
      name: 'Texto de compra',
      type: '.txt',
      size: 200,
      date: '21/08/2020',    
      isVisible: false
    },
    {
      name: 'Musica3',
      type: '.mp3',
      size: 700,
      date: '21/08/2021',    
      isVisible: false
    },
    {
      name: 'Extension rara',
      type: '.cir',
      size: 700,
      date: '21/08/2021',    
      isVisible: false
    },
  ];

  selectedCategory: string = '';
  visitCount: number = 0;

  ngOnInit(): void{
    this.fileService.setData(this.fileList);
    // this.categoryService.setData(this.categoriesList);

    this.categoryService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  constructor(private router: Router, private modalService: NgbModal, private fileService: FileService, private categoryService: CategoryService) {}

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
    this.fileService.increaseVisitCount();
    this.visitCount = this.fileService.getVisitCount();
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

  sortDirection: string = 'asc';
  currentSortColumn: keyof Files = 'name';

  sortTable(column: keyof Files): void {
    this.fileList.sort((a, b) => {
        const aValue = a[column as keyof Files];
        const bValue = b[column as keyof Files];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (this.sortDirection === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (this.sortDirection === 'asc') ? aValue - bValue : bValue - aValue;
        } else {
            return 0;
        }
    });

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentSortColumn = column;
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

  cambiarVista(){
    
    let lista = document.getElementById("ArchivosContainer");
    let tabla = document.getElementById("ArchivosContainerCard");

    if (lista && tabla) {
      lista.classList.toggle("d-none");
      tabla.classList.toggle("d-none");

      const imagen = document.getElementById("imagenVista") as HTMLImageElement;
      if (imagen) {
        if (tabla.classList.contains("d-none")) {
          imagen.src = "../../../assets/img/icons/list.png";
        } else {
          imagen.src = "../../../assets/img/icons/table.png";
        }
      }
    }
  }

}
