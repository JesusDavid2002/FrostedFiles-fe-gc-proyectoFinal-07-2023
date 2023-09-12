import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  currentRecord: any;
  users: any[] = [];
  constructor(private userService: UserService,private swalService: SwalService) {}

  ngOnInit(){
    //this.closeContextMenu();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  modifyUser(){

  }

  deleteUser(user: any) {
    this.userService.deleteUser(user.username).subscribe(
      () => {
        this.swalService.showDeleteUserConfirmation(user, () =>
          this.userService.deleteUser(user)
        );
        this.loadUsers(); // actualizar la lista de usuarios al eliminarlo.
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  
}
