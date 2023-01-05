import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/Helper/constants';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-propertyUser',
  templateUrl: './propertyUser.component.html',
  styleUrls: ['./propertyUser.component.scss'],
})
export class PropertyUserComponent {
  properties: IPropertyBase[];
  public propertyList: Property[] = [];
  public mainPhotoUrl: string = null;
  propertyy = new Property();

  constructor(
    private housingService: HousingService,
    private http: HttpClient
  ) {}
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
  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

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

  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.propertyy.photos) {
      if (photo.isPrimary) {
        this.mainPhotoUrl = photo.imageUrl;
      } else {
        photoUrls.push({
          small: photo.imageUrl,
          medium: photo.imageUrl,
          big: photo.imageUrl,
        });
      }
    }
    return photoUrls;
  }
}
