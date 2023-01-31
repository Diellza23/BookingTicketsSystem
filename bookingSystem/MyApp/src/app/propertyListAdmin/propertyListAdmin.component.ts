import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../Helper/constants';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-propertyListAdmin',
  templateUrl: './propertyListAdmin.component.html',
  styleUrls: ['./propertyListAdmin.component.scss'],
})
export class PropertyListAdminComponent implements OnInit {
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
      this.housingService.deleteThisProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      // window.location.reload();
    }
  }
}
