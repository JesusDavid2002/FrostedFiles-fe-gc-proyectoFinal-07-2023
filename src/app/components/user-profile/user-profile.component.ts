import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userEmail: string | null = null;
  usuario: Users = new Users();
  fotoPerfilData: any = null;
  fotoPortadaData: any = null;
  fotoPerfilUrl: any = null;
  fotoPortadaUrl: any = null;
  showOverlay: boolean = false;
  buttonClicked: boolean = false;

  constructor(private userService: UserService,private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // El user-profile html puede tener problemas si el userService.getUserEmail no va y devuelve undefinied
    var userEmail = this.userService.getUserEmail();
    //console.log(userEmail);
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
        
        //console.log(data);
        this.usuario = data;
      });
    }
  }

  toggleEditMode(event: MouseEvent) {
    event.stopPropagation();
    this.showOverlay = !this.showOverlay;
    if (this.buttonClicked) {
      this.buttonClicked = false;
    } else {
      this.buttonClicked = true;
    }
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
    if (!this.showOverlay) {
      return;
    } else {
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
