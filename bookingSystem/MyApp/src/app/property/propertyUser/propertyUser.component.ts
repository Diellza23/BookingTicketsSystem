import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-propertyUser',
  templateUrl: './propertyUser.component.html',
  styleUrls: ['./propertyUser.component.scss'],
})
export class PropertyUserComponent {
  public propertyList: Property[] = [];
  constructor(
    private housingService: HousingService,
    private http: HttpClient
  ) {}

  @Input() property: IPropertyBase;
  @Input() hideIcons: boolean;

  deleteProperty(id) {
    if (confirm('Do you want to delete this property with this id?' + id)) {
      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
  }
}
