import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Files } from 'src/app/models/files.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { FileService } from 'src/app/services/file.service';
import { CompartirComponent } from './details/compartir/compartir.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ModalCategoriaComponent } from './modal_categoria/modal-categoria.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SwalService } from 'src/app/services/swal.service';
import { id } from '@swimlane/ngx-charts';
import { UserService } from 'src/app/services/user.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Subcategory } from 'src/app/models/subcategory.model';


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
  fileList: Files[] = [];
  selectedFile: Files|null = null;
  categoriesList: Category[] = [];
  subcategoriesList: Subcategory[] = [];
  category: string = '';
  subcategory: string = '';
  visitCount: number = 0;
  selectedFileIndex: number | null = null;
  usuario: any = {};
  userRole: string | null = null;
    
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, private fileService: FileService, 
    private categoryService: CategoryService, private subcategoryService: SubcategoryService, private swalService: SwalService, private userService: UserService) {}

  ngOnInit(): void{
      this.categoryService.getAllCategories().subscribe(result => {
        this.categoriesList = result;
      });
      this.subcategoryService.getAllSubcategories().subscribe(result => {
        this.subcategoriesList = result;
      });
      let userEmail = this.userService.getUserEmail();
      if (userEmail !== null && userEmail !== undefined) {
      this.userService.getUserDetailsByEmail(userEmail).subscribe((data: any) => {
        this.usuario = data;
        this.userRole = this.usuario.roles.nombre;
      });
    }
  }

  onCategorySelected(category: string){
    this.category = category;
    
    this.fileService.getFilesByCategory(this.category).subscribe({
      next: (data) => {
        this.fileList = data;
      }, 
      error: (error) => {
        console.error('Error al obtener archivos por categoria ', error);
      }
    });
  }  

  onSubcategorySelected(subcategory: string){
    this.subcategory = subcategory;
    
    this.fileService.getFilesBySubcategory(this.subcategory).subscribe({
      next: (data) => {
        this.fileList = data;
      }, 
      error: (error) => {
        console.error('Error al obtener archivos por categoria ', error);
      }
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
        '.sql': 'sql.png',
        'sql': 'sql.png',
        'pdf': 'pdf.png'
    };

    const defaultIcon = 'text.png'; // Icono por defecto

    return `../../../assets/img/icons/${iconMappings[fileType || ''] || defaultIcon}`;
  }


  details(index: number): void{
    this.selectedFileIndex = index;
    this.fileList.forEach((file, i) => {
      if (i === index) {
        file.visibilidad = !file.visibilidad;

        let elements = document.getElementsByClassName('btn-files');
        for (let i = 0; i < elements.length; i++) {
          if (file.visibilidad) {
            elements[i].removeAttribute('disabled');
          } else{
            elements[i].setAttribute('disabled', 'true');
          }
        }
      } else {
        file.visibilidad = false;
      }
    });
  }

  sortDirection: string = 'asc';
  currentSortColumn: keyof Files = 'nombre';

  sortTable(column: keyof Files): void {
    this.fileList.sort((a, b) => {
        const aValue = a[column as keyof Files];
        const bValue = b[column as keyof Files];

        if (column === 'fechaSubida') {
            const aDate = this.convertToDate(aValue as string);
            const bDate = this.convertToDate(bValue as string);

            return (this.sortDirection === 'asc') ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
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

  convertToDate(dateString: string): Date {
      const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
      return new Date(year, month - 1, day);
  }


  openModalShare() { 
    if (this.selectedFileIndex !== null) {
      let fileSelected = this.fileList[this.selectedFileIndex];
      let fileName = fileSelected.nombre;

      this.fileService.setSelectedFileName(fileName);
      
      let modalRef = this.modalService.open(CompartirComponent);
      modalRef.componentInstance.name = this.selectedFile;
      modalRef.componentInstance.selectedFile = fileSelected;      
    }
  }

  openModalPermissions(){
    let modalRef = this.modalService.open(PermissionsComponent);
  }

  openModalCategory(){
    const modalRef = this.modalService.open(ModalCategoriaComponent);
    modalRef.componentInstance.name = 'nombre categoria que se creará';
  }

  cambiarVista(){
    let lista = document.getElementById("ArchivosContainerList");
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

  navigateDetails() {
    if (this.selectedFileIndex !== null) {
      let fileSelected = this.fileList[this.selectedFileIndex];
      let fileName = fileSelected.nombre;

      this.fileService.setSelectedFileName(fileName);
      this.router.navigate(['home/details']);
      
    }
  }

  onDeleteFile(): void {  
    if (this.selectedFileIndex !== null) {
      let fileSelected = this.fileList[this.selectedFileIndex];
      let fileName = fileSelected.nombre;

      this.swalService.showDeleteAlertFile(this.selectedFileIndex, () => {
        this.fileService.deleteFiles(fileName).subscribe(
          () => {
            this.fileList.splice(this.selectedFileIndex!, 1);
            this.selectedFileIndex = null;
          },
          (error) => {
            console.error('Error al eliminar el archivo:', error);
          }
        );
      });
    }
  }

  onSelectFile(): void{
    if (this.selectedFileIndex !== null) {
      let fileSelected = this.fileList[this.selectedFileIndex];
      let fileName = fileSelected.nombre;

      this.fileService.setSelectedFileName(fileName);
      this.router.navigate(['/home/update-file']);
      
    }
  }

}
