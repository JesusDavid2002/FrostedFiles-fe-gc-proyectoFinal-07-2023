import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  profilePhoto: string = 'https://cdn.discordapp.com/attachments/598612400031268878/1138873238445891624/default-avatar-3014646752.png';
  backgroundPhoto: string = 'https://cdn.discordapp.com/attachments/598612400031268878/1138873345291595806/CubesBlue.jpg';
  showOverlay: boolean = false;
  buttonClicked: boolean = false;

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
            this.profilePhoto = reader.result as string;
          } else if (imageType === 'fondo') {
            this.backgroundPhoto = reader.result as string;
            this.updateBackgroundImage(this.backgroundPhoto);
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
