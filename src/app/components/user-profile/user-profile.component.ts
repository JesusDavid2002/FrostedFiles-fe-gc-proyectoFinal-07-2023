import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userEmail: string | null = null;
  usuario: Users = new Users();
  nombreInputValue: string = '';
  fotoPerfilData: any = null;
  fotoPortadaData: any = null;
  fotoPerfilUrl: any = null;
  fotoPortadaUrl: any = null;
  showOverlay: boolean = false;
  editMode: boolean = false;

  constructor(private userService: UserService,private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // El user-profile html puede tener problemas si el userService.getUserEmail no va y devuelve undefinied
    var userEmail = this.userService.getUserEmail();
    if (userEmail !== null && userEmail !== undefined) {
      this.userService.getUserDetailsByEmail(userEmail).subscribe((data: any) => {
        this.fotoPerfilData = data.fotoPerfil;
        this.fotoPerfilUrl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/jpeg;base64,' + this.fotoPerfilData
        );

        this.fotoPortadaData = data.fotoPortada;
        this.fotoPortadaUrl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/jpeg;base64,' + this.fotoPortadaData
        );
        
        console.log(data);
        this.usuario = data;
      });
    }
  }

  toggleEditMode(event: MouseEvent) {
    console.log(this.editMode);
    event.stopPropagation();
    this.showOverlay = !this.showOverlay;
    if (this.editMode) {
      this.editMode = false;
      this.saveProfile()
    } else {
      this.editMode = true;
    }
  }
  // Faltaria añadir un aviso al usuario que los cambios se han guardado!
  saveProfile() {
    const formData = new FormData();
  
    formData.append('nombre', this.usuario.nombre);
    formData.append('descripcion', this.usuario.descripcion);
  
    if (this.fotoPerfilUrl !== this.usuario.fotoPerfil) {
      const fotoPerfilBlob = this.dataURItoBlob(this.fotoPerfilUrl);
      if (fotoPerfilBlob === this.fotoPerfilUrl) {
      } else  {
        const fotoPerfilFile = new File([fotoPerfilBlob], 'fotoPerfil.jpg');
        formData.append('fotoPerfil', fotoPerfilFile);
    }
    }
  
    if (this.fotoPortadaUrl !== this.usuario.fotoPortada) {
      const fotoPortadaBlob = this.dataURItoBlob(this.fotoPortadaUrl);
      if (fotoPortadaBlob === this.fotoPortadaUrl) {
      } else  {
        const fotoPortadaFile = new File([fotoPortadaBlob], 'fotoPortada.jpg');
        formData.append('fotoPortada', fotoPortadaFile);
      }
    }
  
    if (
      formData.has('nombre') ||
      formData.has('descripcion') ||
      formData.has('fotoPerfil') ||
      formData.has('fotoPortada')
    ) {
      this.userService.updateUser(formData).subscribe(
        (data: any) => {
          this.usuario = data;
        },
        (error) => {
          console.error("Error SaveProfile() user-profile.component:", error);
        }
      );
    } else {
      console.log("No changes to save.");
    }
  }
  

  dataURItoBlob(dataURI: string): Blob {
    if (typeof dataURI !== 'string') {
      console.log('Invalid dataURI format: dataURI must be a string');
    } else {
    
      const dataURIParts = dataURI.split(',');
      if (dataURIParts.length < 2) {
        console.log('Invalid dataURI format: dataURI should contain at least one comma');
      }
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
    return dataURI;
  }

  allowDrop(event: any) {
    if (!this.showOverlay) {
      return;
    }
    event.preventDefault();
  }

  openImagePicker(imageType: string) {
    if (this.showOverlay == false) {
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event: any) => this.handleImageChange(event, imageType));
    input.click();
  }

  handleImageChange(event: any, imageType: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imageType === 'profile') {
          this.fotoPerfilUrl = reader.result as string;
        } else if (imageType === 'fondo') {
          this.fotoPortadaUrl = reader.result as string;
          this.updateBackgroundImage(this.fotoPortadaUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  updateBackgroundImage(imageUrl: string) {
    const fondoElement = document.querySelector('.fondo') as HTMLElement;
    fondoElement.style.backgroundImage = `url(${imageUrl})`;
  }

  handleBackgroundDrop(event: any) {
    if (!this.showOverlay) {
      return;
    } else {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.handleImageChange({ target: { files: [file] } }, 'fondo');
    }
  }

  handleBackgroundClick() {
    if (this.showOverlay) {
      this.openImagePicker('fondo');
    }
  }

  handleProfilePhotoDrop(event: any) {
    if (!this.showOverlay) {
      return;
    } else {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.handleImageChange({ target: { files: [file] } }, 'profile');
    }
  }

}
