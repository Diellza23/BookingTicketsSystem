import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Property } from 'src/app/model/property';
import { Constants } from 'src/app/Helper/constants';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IPropertyBase[];
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  public propertyList: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      (data) => {
        this.properties = data;
        console.log(data);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
  onCityFilter() {
    this.SearchCity = this.City;
  }
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

  // deleteProperty(id: number) {
  //   if (confirm('Do you want to delete this property?')) {
  //     this.housingService.deleteProperty(id).subscribe((res) => {
  //       alert('deleted');
  //     });
  //   }
  //   return this.http.delete<Property[]>(
  //     `https://localhost:5001/api/propperty/deleteProperty/` + id
  //   );
  // }

  deleteProperty(id) {
    if (confirm('Do you want to delete this property with this id?' + id)) {
      // return this.http
      //   .delete(`https://localhost:5001/api/user/deleteUser/` + id)
      //   .subscribe();
      // }

      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
    // this.userService.deleteUser(id).subscribe((user) => {
    //   this.getAllUser();
    // });

    // if (window.confirm('Are you sure you want to delete user with id: ' + id)) {
    //   this.userService.deleteUser(id);
  }
}
