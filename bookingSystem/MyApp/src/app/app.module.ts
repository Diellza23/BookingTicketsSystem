import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AllUserManagementComponent } from './all-user-management/all-user-management.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { Routes, RouterModule } from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from './services/alertify.service';
import { PropertyDetailsResolverService } from './property/property-detail/property-details-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PropertyUserComponent } from './property/propertyUser/propertyUser.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditPropertyComponent } from './property/edit-property/edit-property.component';
import { PropertyRentComponent } from './property/property-rent/property-rent.component';
import { PropertySellComponent } from './property/property-sell/property-sell.component';
import { AuthGuardService } from './guards/auth.service';
import { PropertyModuleComponent } from './property-module/prop-moduleManagement/property-module.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './modal-components/confirm-modal/confirm-modal.component';
import { AddUpdatePropComponent } from './modal-components/confirm-modal/add-update-prop/add-update-prop.component';
import { EditUserInformationComponent } from './edit-user-information/edit-user-information.component';
import { ChangePasswordComponent } from './change-Password/change-Password.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PhotoEditorComponent } from './property/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

const appRoutes: Routes = [
  // {path: 'add-property', component: AddPropertyComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'propertyCard', component: PropertyCardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'property-management', component: PropertyModuleComponent },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'contact',
    component: ContactFormComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'profile-edit/:id',
  //   component: ProfileEditComponent,
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit-user-info/:id',
    component: EditUserInformationComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'all-user-management',
    component: AllUserManagementComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'sell-property', component: PropertySellComponent },
  { path: 'rent-property', component: PropertyRentComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'about-us', component: AboutUsComponent },
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent,
    resolve: { prp: PropertyDetailsResolverService },
  },

  {
    path: 'edit-property/:id',
    component: EditPropertyComponent,
    canActivate: [AuthGuardService],
  },

  { path: '**', component: PropertyListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    AllUserManagementComponent,
    DashboardComponent,
    PropertyListComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    FilterPipe,
    SortPipe,
    MainComponent,
    PropertyUserComponent,
    EditPropertyComponent,
    ProfileComponent,
    AboutUsComponent,
    PropertyRentComponent,
    PropertySellComponent,
    PropertyModuleComponent,
    ConfirmModalComponent,
    AddUpdatePropComponent,
    EditUserInformationComponent,
    ChangePasswordComponent,
    ProfileEditComponent,
    ContactFormComponent,
    PhotoEditorComponent,
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [
    HousingService,
    AlertifyService,
    PropertyDetailsResolverService,
    DatePipe,
  ],
  bootstrap: [AppComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule,
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,
    ModalModule.forRoot(),
    FileUploadModule,
  ],
})
export class AppModule {}
