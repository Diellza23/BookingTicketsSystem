import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponseCode } from '../enums/responseCode';
import { ResponseModel } from '../Models/responseModel';
import { Role } from '../Models/role';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public roles: Role[] = [];
  public registerForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }
  onSubmit() {
    let fullName = this.registerForm.controls['fullName'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let phoneNumber = this.registerForm.controls['phoneNumber'].value;
    let address = this.registerForm.controls['address'].value;
    let country = this.registerForm.controls['country'].value;
    let state = this.registerForm.controls['state'].value;

    this.userService
      .register(
        fullName,
        email,
        password,
        this.roles.filter((x) => x.isSelected).map((x) => x.role),
        phoneNumber,
        address,
        country,
        state
      )
      .subscribe(
        (data: ResponseModel) => {
          if (data.responseCode == ResponseCode.OK) {
            this.registerForm.controls['fullName'].setValue('');
            this.registerForm.controls['email'].setValue('');
            this.registerForm.controls['password'].setValue('');
            this.registerForm.controls['phoneNumber'].setValue('');
            this.registerForm.controls['address'].setValue('');
            this.registerForm.controls['country'].setValue('');
            this.registerForm.controls['state'].setValue('');
            this.roles.forEach((x) => (x.isSelected = false));
          } else if (data.responseCode == ResponseCode.Error) {
            this.alertify.error(data.responseMessage);
            console.log(data.responseMessage);
          } else if (data.responseCode == ResponseCode.PasswordError) {
            this.alertify.error(data.responseMessage);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
  getAllRoles() {
    this.userService.getAllRole().subscribe((roles) => {
      this.roles = roles;
    });
  }
  onRoleChange(role: string) {
    // this.roles.forEach((x) => {
    //   if (x.role == role) {
    //     x.isSelected = !x.isSelected;
    //   }
    // });
    this.roles.forEach((x) => {
      if (x.role == role) {
        x.isSelected = true;
      } else {
        x.isSelected = false;
      }
    });
  }
  get isRoleSelected() {
    return this.roles.filter((x) => x.isSelected).length > 0;
  }
}
