import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-Password',
  templateUrl: './change-Password.component.html',
  styleUrls: ['./change-Password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  editPassword = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    console.log(this.router.snapshot.params.id);
    this.userService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((res) => {
        this.editPassword = new FormGroup({
          currentPassword: new FormControl(
            res['currentPassword'],
            Validators.required
          ),
          newPassword: new FormControl(res['newPassword']),
          confirmPassword: new FormControl(res['confirmPassword']),
        });
      });
  }

  updatePassword() {
    try {
      this.userService
        .changePassword(this.router.snapshot.params.id, this.editPassword.value)
        .subscribe((result) => {
          if (result) {
            this.alertify.success('Password updated successfully');
            console.log(result, 'data updated successfully');
          }
        });
    } catch (error) {
      this.alertify.error(error.message);
    }
  }
}
