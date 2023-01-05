import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Constants } from 'src/app/Helper/constants';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { User } from 'src/app/Models/user';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent {
  @Input() property: Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();

  uploader: FileUploader;
  maxAllowedFileSize = 10 * 1024 * 1024;

  constructor(private housingService: HousingService) {}

  initializeFileUploader() {
    this.uploader = new FileUploader({
      url:
        'https://localhost:5001/api/propperty/add/photo/' +
        String(this.property.id),
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: this.maxAllowedFileSize,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.property.photos.push(photo);
      }
    };
  }

  mainPhotoChanged(url: string) {
    this.mainPhotoChangedEvent.emit(url);
  }

  ngOnInit() {
    this.initializeFileUploader();
  }
  setPrimaryPhoto(propertyId: number, photo: Photo) {
    this.housingService
      .setPrimaryPhoto(propertyId, photo.publicId)
      .subscribe(() => {
        this.mainPhotoChanged(photo.imageUrl);
        this.property.photos.forEach((p) => {
          if (p.isPrimary) {
            p.isPrimary = false;
          }
          if (p.publicId === photo.publicId) {
            p.isPrimary = true;
          }
        });
      });
  }
  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  deletePhoto(propertyId: number, photo: Photo) {
    this.housingService
      .deletePhoto(propertyId, photo.publicId)
      .subscribe(() => {
        this.property.photos = this.property.photos.filter(
          (p) => p.publicId !== photo.publicId
          //kthen nje element ku publicId e fotos nuk eshte e barabarte me
          //publicId e fotos e cila u fshi pas klikimit te butonit
        );
      });
  }
}
