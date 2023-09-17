import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  currentRecord: any;
  users: Users[] = [];
  
  constructor(private userService: UserService,private swalService: SwalService) {}

  ngOnInit(){
    //this.closeContextMenu();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  modifyUser(user: any) {
    const roles = ['USER', 'MODERATOR', 'ADMIN'];
  
    this.userService.getUserDetailsByEmail(user.username).subscribe(
      (userObject: any) => {
        this.swalService.showModifyUserPopup(userObject, roles, (formData: FormData, selectedRole: string) => {
          userObject.nombre = formData.get('nombre');
          userObject.username = formData.get('username');
          userObject.roles = { nombre: selectedRole, primaryKey: { nombre: selectedRole } };
  
          console.log(userObject.nombre);
          console.log(userObject.username);
          console.log(userObject.roles);
  
          this.userService.updateAdmin(user.username, userObject).subscribe(
            () => {
              this.loadUsers();
            },
            (error) => {
              console.error('Error updating user:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error retrieving user details:', error);
      }
    );
  }

  deleteUser(user: any) {
    this.swalService.showDeleteUserConfirmation(user, () => {
      this.userService.deleteUser(user.username).subscribe(
        () => {
          this.loadUsers(); // Actualiza la lista de usuarios después de eliminarlo
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    });
  }
}
