import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ResponseCode } from '../enums/responseCode';
import { Constants } from '../Helper/constants';
import { ConfirmModalComponent } from '../modal-components/confirm-modal/confirm-modal.component';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { AlertifyService } from '../services/alertify.service';
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
    private http: HttpClient,
    private modalService: BsModalService,
    private alertify: AlertifyService
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
    const initialState: ModalOptions = {
      initialState: {
        message: 'Do you want to delete?',
        confirmTitle: 'Yes',
        declineTitle: 'No',
      },
    };
    const bsModalRef = this.modalService.show(
      ConfirmModalComponent,
      initialState
    );
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.housingService.deleteThisProperty(id).subscribe((res) => {
          if (res.responseCode == ResponseCode.OK) {
            this.alertify.success('Property deleted successfully!');
            window.location.reload();
          } else {
            this.alertify.error('Property could not be deleted');
          }
        });
      }
    });
  }
}
