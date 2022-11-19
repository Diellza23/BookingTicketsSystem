import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './Helper/constants';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedinUser: string;

  title = 'MyApp';
  constructor(private router: Router) {}
  onLogout() {
    localStorage.removeItem(Constants.USER_KEY);
    // this.router.navigate(['/user-management']);
  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  get isAdmin(): boolean {
    return this.user.roles.indexOf('Admin') > -1;
  }

  get isUser(): boolean {
    return this.user.roles.indexOf('User') > -1 && !this.isAdmin;
  }
  //   loggedin() {
  //     this.loggedinUser = localStorage.getItem('email');
  //     return this.loggedinUser;
  // }
}
