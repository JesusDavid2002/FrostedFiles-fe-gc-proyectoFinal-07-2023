import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  currentRecord: any;
  users: any = ([
    {
      name: 'Mark Jacob',
      email: 'markjacob@fat',
      role: 'user'
    },
    { name: 'Otto Thornton',
      email: 'ottothornton@fat',
      role: 'user'
    }
  ]);

  ngOnInit(){
    //this.closeContextMenu();
  }

  modifyUser(){

  }

  deleteUser(){
    //this.closeContextMenu();
    confirm("Estas seguro de eliminar a "+ this.currentRecord.name);
  }

  
}
