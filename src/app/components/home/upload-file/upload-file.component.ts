import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Files } from 'src/app/models/files.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';  
import { FileService } from 'src/app/services/file.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  categoriesList: Category[] = [];  
  subcategoriesByCategory: { [categoryName: string]: Subcategory[] } = {};
  selectedFiles: File[] = [];
  selectedVisibility: number = 1; 
  selectedCategory: string = '';
  selectedSubcategory: string = '';

  constructor(private categoryService: CategoryService, private subcategoryService: SubcategoryService,private fileService: FileService, private router: Router) {}

  ngOnInit(){
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (result) => {
        this.categoriesList = result;

        // Inicializa subcategoriesByCategory con las categorías como claves vacías
        this.categoriesList.forEach((category) => {
          this.subcategoriesByCategory[category.nombre] = [];
        });

        // Llena subcategoriesByCategory con las subcategorías correspondientes
        this.categoriesList.forEach((category) => {
          this.subcategoryService.getSubcategory(category.nombre).subscribe(
            (subcategories) => {
              this.subcategoriesByCategory[category.nombre] = subcategories;
            },
            (error) => {
              console.error(`Error al obtener subcategorías para ${category.nombre}:`, error);
            }
          );
        });
      }
    );
  }

  createFile(): void{
    if (this.selectedFiles.length === 0) {
      console.error('No se han seleccionado archivos.');
      return;
    }
    

    this.selectedFiles.forEach((file) => {
      let fileData: Files = new Files();
      let fileNameComplete = file.name.split('.');
      let fileName = fileNameComplete.slice(0, -1).join('.');
      let fileExtension = fileNameComplete.pop();
      let fileDate = new Date();

      fileData.nombre = fileName;
      fileData.extension = '.'+(fileExtension ? fileExtension : '');
      fileData.tamano = file.size;
      fileData.fechaSubida = fileDate.toISOString();
      fileData.visibilidad = this.selectedVisibility === 1;

      let selectedCategory = this.categoriesList.find(c => c.nombre === this.selectedCategory);
      if (!selectedCategory) {
        console.log(`La categoría ${this.selectedCategory} no se encontró en la lista de categorías.`);
        return;
      }

      // let selectedSubcategory = this.subcategoriesList.find(c => c.nombre === this.selectedSubcategory);
      // if (!selectedSubcategory) {
      //   console.log(`La subcategoría ${this.selectedSubcategory} no se encontró en la lista de subcategorías.`);
      //   return;
      // }
    
      // Aquí asignamos la categoría seleccionada de la lista, en vez de una nueva instancia
      fileData.categories = selectedCategory; 
      // fileData.subcategories = selectedSubcategory; 

      this.fileService.postFiles(fileData, file).subscribe({
        next: (response) => {
          console.log('Archivo subido: ', response);
        },
        error: (error) => {
          console.error('Error al subir archivo: ', error);
        },
      });
    });
    this.router.navigateByUrl("/home");
  }

  // Utilizando el metodo onFileDropped y el evento dragEvent (arrastrar y soltar).
  // Utilizamos el metodo preventDefault() para evitar que el navegador haga su accion predeterminada
  onFileDropped(event: DragEvent){
    event.preventDefault();
    // Almacenamos todos los ficheros en files y los vamos recorriendo 1 a 1 y subiendo al array de objetos selectedFiles
    let files = event.dataTransfer?.files;
    if(files && files.length > 0){
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
  
  onDragOver(event: DragEvent){
    event.preventDefault();
  }

  // Utilizando un input de tipo file y el event podemos subir archivos en vez de arrastrandolos de forma manual
  onFileSelected(event: any){
    let elements = event.target as HTMLInputElement;
    if(elements.files && elements.files.length > 0){
      let files: FileList = elements.files;
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }

} 
