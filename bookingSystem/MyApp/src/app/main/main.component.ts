import { Component, OnInit } from '@angular/core';
import { IPropertyBase } from '../model/ipropertybase';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  properties: IPropertyBase[];
  constructor(private housingService: HousingService) {}

  ngOnInit() {
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
}
