import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Property } from 'src/app/model/property';
import { Constants } from 'src/app/Helper/constants';
import { Ikeyvaluepair } from 'src/app/model/ikeyvaluepair';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  // SellRent = [1, 2];
  properties: IPropertyBase[];
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  PriceFilter = '';
  cityName: string;
  filteredProperties: IPropertyBase[] = [];
  price: number;
  priceFilterType = 'All';
  priceFilterValue = null;
  propertyTypes: Ikeyvaluepair[];

  public propertyList: Property[] = [];

  constructor(private housingService: HousingService) {}

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      (data) => {
        this.properties = data;
        this.filteredProperties = data;
      },
      (error) => {
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

  deleteProperty(id) {
    if (confirm('Do you want to delete this property with this id?' + id)) {
      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
  }

  clearCityName() {
    this.cityName = '';
    this.filteredProperties = this.properties;
  }

  sortPropertiesByPrice(sortDirection: string) {
    if (sortDirection === 'asc') {
      this.properties.sort((a, b) => a.price - b.price);
    } else if (sortDirection === 'desc') {
      this.properties.sort((a, b) => b.price - a.price);
    }
  }

  filterByCityAndPropertyTypeAndPrice() {
    let filteredByCityAndPropertyType = this.properties;
    if (this.cityName) {
      filteredByCityAndPropertyType = filteredByCityAndPropertyType.filter(
        (property) => {
          return property.city
            .toLowerCase()
            .includes(this.cityName.toLowerCase());
        }
      );
    }
    if (this.propertyTypes) {
      filteredByCityAndPropertyType = filteredByCityAndPropertyType.filter(
        (property) => {
          return property.propertyType
            .toLowerCase()
            .includes(this.propertyTypes.toString());
        }
      );
    }
    if (!this.priceFilterValue || isNaN(this.priceFilterValue)) {
      this.filteredProperties = filteredByCityAndPropertyType;
      return;
    }
    if (this.priceFilterType === 'greaterThan') {
      this.filteredProperties = filteredByCityAndPropertyType.filter(
        (property) => {
          return property.price > this.priceFilterValue;
        }
      );
    } else if (this.priceFilterType === 'lessThan') {
      this.filteredProperties = filteredByCityAndPropertyType.filter(
        (property) => {
          return property.price < this.priceFilterValue;
        }
      );
    } else if (this.priceFilterType === 'equalTo') {
      this.filteredProperties = filteredByCityAndPropertyType.filter(
        (property) => {
          return property.price === this.priceFilterValue;
        }
      );
    } else {
      this.filteredProperties = filteredByCityAndPropertyType;
    }
  }
}
