import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-sell',
  templateUrl: './property-sell.component.html',
  styleUrls: ['./property-sell.component.scss'],
})
export class PropertySellComponent implements OnInit {
  SellRent = 1;
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

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 1; // Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllPropertiesRent(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
        this.filteredProperties = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterByCity() {
    if (this.cityName) {
      this.filteredProperties = this.properties.filter((property) => {
        return property.city
          .toLowerCase()
          .includes(this.cityName.toLowerCase());
      });
    } else {
      this.filteredProperties = this.properties;
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

  onPriceFilter() {
    this.filterByPrice();
  }

  onPriceFilterClear() {
    this.price = 0;
    this.PriceFilter = '';
    this.filteredProperties = this.properties;
  }

  filterByPrice() {
    if (!this.priceFilterValue || isNaN(this.priceFilterValue)) {
      this.filteredProperties = this.properties;
      return;
    }
    if (this.priceFilterType === 'greaterThan') {
      this.filteredProperties = this.properties.filter((property) => {
        return property.price > this.priceFilterValue;
      });
    } else if (this.priceFilterType === 'lessThan') {
      this.filteredProperties = this.properties.filter((property) => {
        return property.price < this.priceFilterValue;
      });
    } else if (this.priceFilterType === 'equalTo') {
      this.filteredProperties = this.properties.filter((property) => {
        return property.price === this.priceFilterValue;
      });
    }
  }

  sortProperties() {
    if (this.SortbyParam === 'price') {
      if (this.SortDirection === 'desc') {
        this.filteredProperties.sort((a, b) => b.price - a.price);
      } else {
        this.filteredProperties.sort((a, b) => a.price - b.price);
      }
    }
  }
}
