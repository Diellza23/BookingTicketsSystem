import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-user-management',
  templateUrl: './all-user-management.component.html',
  styleUrls: ['./all-user-management.component.scss'],
})
export class AllUserManagementComponent implements OnInit {
  public userList: User[] = [];
  
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
    });
  }

  deleteUser(id) {
    if (confirm('Do you want to delete this user with this id?' + id)) {
      // return this.http
      //   .delete(`https://localhost:5001/api/user/deleteUser/` + id)
      //   .subscribe();
      // }

      this.userService.deleteUser(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();

      // this.userService.deleteUser(id).subscribe((user) => {
      //   this.getAllUser();
      // });

      // if (window.confirm('Are you sure you want to delete user with id: ' + id)) {
      //   this.userService.deleteUser(id);
    }
  }
}
