import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../services/alertify.service';
import { ConfirmModalComponent } from '../modal-components/confirm-modal/confirm-modal.component';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-all-user-management',
  templateUrl: './all-user-management.component.html',
  styleUrls: ['./all-user-management.component.scss'],
})
export class AllUserManagementComponent implements OnInit {
  public userList: User[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
    });
  }

  // deleteUser(id) {
  //   if (confirm('Do you want to delete this user with this id?' + id)) {
  //     // return this.http
  //     //   .delete(`https://localhost:5001/api/user/deleteUser/` + id)
  //     //   .subscribe();
  //     // }

  //     this.userService.deleteUser(id).subscribe((result) => {
  //       console.warn('deleted?', result);
  //       this.getAllUser();
  //     });

  //     // this.userService.deleteUser(id).subscribe((user) => {
  //     //   this.getAllUser();
  //     // });

  //     // if (window.confirm('Are you sure you want to delete user with id: ' + id)) {
  //     //   this.userService.deleteUser(id);
  //   }
  // }

  deleteUser(id) {
    const initialState: ModalOptions = {
      initialState: {
        message: 'Do you want to delete?',
        confirmTitle: 'Yes',
        declineTitle: 'No',
      },
    };
    const bsModalRef = this.modalService.show(
      ConfirmModalComponent,
      initialState
    );
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          (res) => {
            this.alertify.success('User account deleted successfully!');
            this.getAllUser();
          },
          (err) => {
            this.alertify.error('User account could not be deleted!');
            this.alertify.error(
              'All properties posted by this User account must be deleted!'
            );
          }
        );
      }
    });
  }
}
