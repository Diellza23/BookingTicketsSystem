import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserManagementComponent } from './all-user-management/all-user-management.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth.service';
import { LoginComponent } from './login/login.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {PropertyListComponent} from './property/property-list/property-list.component'
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'propertyCard', component: PropertyCardComponent },
  { path: 'propertyList', component: PropertyListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'all-user-management',
    component: AllUserManagementComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
