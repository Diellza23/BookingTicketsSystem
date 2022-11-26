import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { Ikeyvaluepair } from 'src/app/model/ikeyvaluepair';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit {
  alert: boolean = false;
  id: number;

  propertyTypes: Ikeyvaluepair[];
  furnishTypes: Ikeyvaluepair[];
  cityList: any[];

  propertyView: IPropertyBase = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    propertyType: null,
    furnishingType: null,
    bhk: null,
    builtArea: null,
    city: '',
    readyToMove: null,
    country: null,
    description: null,
  };

  editProperty = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    mainEntrance: new FormControl(''),
    floorNo: new FormControl(''),
    security: new FormControl(''),
    maintenance: new FormControl(''),
    description: new FormControl(''),
    possession: new FormControl(''),
    builtArea: new FormControl(''),
    carpetArea: new FormControl(''),
    furnishingType: new FormControl(''),
    city: new FormControl(''),
  });
  constructor(
    private housingService: HousingService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.housingService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((result) => {
        this.editProperty = new FormGroup({
          name: new FormControl(result['name']),
          address: new FormControl(result['address']),
          address2: new FormControl(result['address2']),
          mainEntrance: new FormControl(result['mainEntrance']),
          floorNo: new FormControl(result['floorNo']),
          security: new FormControl(result['security']),
          maintenance: new FormControl(result['maintenance']),
          description: new FormControl(result['description']),
          possession: new FormControl(result['possession']),
          builtArea: new FormControl(result['builtArea']),
          carpetArea: new FormControl(result['carpetArea']),
          furnishingType: new FormControl(result['furnishingType']),
          city: new FormControl(result['city']),
        });
      });
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
      console.log(data);
    });

    this.housingService.getPropertyTypes().subscribe((data) => {
      this.propertyTypes = data;
    });

    this.housingService.getFurnishingTypes().subscribe((data) => {
      this.furnishTypes = data;
    });
  }

  updateProperty(id: number) {
    this.housingService
      .updateProperty(this.router.snapshot.params.id, this.editProperty.value)
      .subscribe((result) => {
        this.cityList = this.cityList;
        console.log(result, 'data updated successfully');
      });
  }
}
