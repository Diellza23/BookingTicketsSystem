import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { Ikeyvaluepair } from 'src/app/model/ikeyvaluepair';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit {
  alert: boolean = false;
  id: number;
  public mainPhotoUrl: string = null;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  propertyTypes: any[];
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
    estPossessionOn: '',
    city: '',
    readyToMove: null,
    country: null,
    description: null,
  };

  editProperty = new FormGroup({
    name: new FormControl(''),
    sellRent: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    mainEntrance: new FormControl(''),
    floorNo: new FormControl(''),
    totalFloors: new FormControl(''),
    security: new FormControl(''),
    maintenance: new FormControl(''),
    description: new FormControl(''),
    estPossessionOn: new FormControl(''),
    builtArea: new FormControl(''),
    carpetArea: new FormControl(''),
    furnishingType: new FormControl(''),
    city: new FormControl(''),
    propertyType: new FormControl(''),
    bhk: new FormControl(''),
    price: new FormControl(''),
    readyToMove: new FormControl(''),
    country: new FormControl(''),
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
          sellRent: new FormControl(result['sellRent']),
          name: new FormControl(result['name']),
          address: new FormControl(result['address']),
          address2: new FormControl(result['address2']),
          mainEntrance: new FormControl(result['mainEntrance']),
          floorNo: new FormControl(result['floorNo']),
          totalFloors: new FormControl(result['totalFloors']),
          security: new FormControl(result['security']),
          maintenance: new FormControl(result['maintenance']),
          description: new FormControl(result['description']),
          estPossessionOn: new FormControl(result['estPossessionOn']),
          builtArea: new FormControl(result['builtArea']),
          carpetArea: new FormControl(result['carpetArea']),
          furnishingType: new FormControl(result['furnishingType']),
          city: new FormControl(result['city']),
          propertyType: new FormControl(result['propertyType']),
          bhk: new FormControl(result['bhk']),
          price: new FormControl(result['price']),
          readyToMove: new FormControl(result['readyToMove']),
          country: new FormControl(result['country']),
        });
      });
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
    });

    this.housingService.getPropertyTypes().subscribe((data) => {
      this.propertyTypes = data;
    });

    this.housingService.getFurnishingTypes().subscribe((data) => {
      this.furnishTypes = data;
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
      },
    ];

    this.galleryImages = this.getPropertyPhotos();
  }
  changePrimaryPhoto(mainPhotoUrl: string) {
    this.mainPhotoUrl = mainPhotoUrl;
  }

  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.property.photos) {
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

  updateProperty() {
    // alert(this.router.snapshot.params.id);
    alert(JSON.stringify(this.editProperty.value));
    // return;

    this.housingService.updateProperty(
      this?.router?.snapshot?.params?.id,
      this?.editProperty?.value
    );
  }
}
