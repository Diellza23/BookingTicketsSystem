import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  public mainPhotoUrl: string = null;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe((data: Property) => {
      this.property = data['prp'];
      console.log(this.property.photos);
    });

    this.property.age = this.housingService.getPropertyAge(
      this.property.estPossessionOn
    );

    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: Property) => {
    //       this.property = data;
    //      }
    //   )
    // });

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

  get isUserlogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }
  get isAdmin(): boolean {
    return this.user.roles.indexOf('Admin') > -1;
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

  deleteProperty(id) {
    if (confirm('Do you want to delete this user with this id?' + id)) {
      // return this.http
      //   .delete(`https://localhost:5001/api/user/deleteUser/` + id)
      //   .subscribe();
      // }

      this.housingService.deleteProperty(id).subscribe((result) => {
        console.warn('deleted?', result);
      });
      window.location.reload();
    }
  }
}
