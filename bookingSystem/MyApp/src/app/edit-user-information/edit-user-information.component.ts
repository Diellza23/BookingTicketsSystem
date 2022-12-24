import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss'],
})
export class EditUserInformationComponent implements OnInit {
  editUser = new FormGroup({
    userId: new FormControl(''),
    fullName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    console.log(this.router.snapshot.params.id);
    this.userService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.editUser = new FormGroup({
          userId: new FormControl(res['id']),
          fullName: new FormControl(res['fullName']),
          userName: new FormControl(res['userName']),
          email: new FormControl(res['email']),
        });
      });
  }

  updateUser() {
    this.userService
      .updateUser(this.router.snapshot.params.id, this.editUser.value)
      .subscribe((result) => {
        if (result) {
          this.alertify.success('Personal information updated successfully');
          console.log(result, 'data updated successfully');
        } else {
          this.alertify.error("Data modification didn't work!");
        }
      });
  }
}
