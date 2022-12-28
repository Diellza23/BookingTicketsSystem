import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseCode } from '../../enums/responseCode';
import { Constants } from '../../Helper/constants';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../modal-components/confirm-modal/confirm-modal.component';
import { Prop } from '../../Models/prop';
import { User } from '../../Models/user';
import { PropService } from '../../services/prop.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AddUpdatePropComponent } from 'src/app/modal-components/confirm-modal/add-update-prop/add-update-prop.component';

@Component({
  selector: 'app-property-module',
  templateUrl: './property-module.component.html',
  styleUrls: ['./property-module.component.scss'],
})
export class PropertyModuleComponent implements OnInit {
  public propList: Prop[] = [];
  public headerTitle: string = '';

  constructor(
    private propService: PropService,
    private http: HttpClient,
    private modalService: BsModalService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllProps();
  }
  getAllProps() {
    this.propService
      .getPropsByAuthorId(this.user.id)
      .subscribe((data: Prop[]) => {
        this.propList = data;
      });
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }

  onEdit(tempProperty: Prop) {
    const initialState: ModalOptions = {
      initialState: {
        headerTitle: 'Update Prop',
        propId: tempProperty.id,
        name: tempProperty.name,
        propertyType: tempProperty.propertyTypeId,
        furnishingType: tempProperty.furnishingTypeId,
        price: tempProperty.price,
        builtArea: tempProperty.builtArea,
        address: tempProperty.address,
        address2: tempProperty.address2,
        city: tempProperty.cityId,
        floorNo: tempProperty.floorNo,
        totalFloors: tempProperty.totalFloors,
        readyToMove: tempProperty.readyToMove,
        mainEntrance: tempProperty.mainEntrance,
        security: tempProperty.security,
        maintenance: tempProperty.maintenance,
        dateOfPossession: tempProperty.estPossessionOn,
        description: tempProperty.description,
      },
      ignoreBackdropClick: true,
      backdrop: true,
      class: 'modal-lg',
    };
    const bsModalRef = this.modalService.show(
      AddUpdatePropComponent,
      initialState
    );
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.getAllProps();
      }
    });
  }

  onAddNew() {
    const initialState: ModalOptions = {
      initialState: {},
      ignoreBackdropClick: true,
      backdrop: true,
      class: 'modal-lg',
    };
    const bsModalRef = this.modalService.show(
      AddUpdatePropComponent,
      initialState
    );
    bsModalRef.content.modalResponse.subscribe((result) => {
      if (result) {
        this.getAllProps();
      }
    });
  }

  onDelete(propId: number) {
    console.log('OnDelete');
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
        this.propService.deleteProp(propId).subscribe((res) => {
          if (res.responseCode == ResponseCode.OK) {
            this.alertify.success('Property deleted successfully!');
            this.getAllProps();
          } else {
            this.alertify.error('Property could not be deleted');
          }
        });
      }
    });
  }
}
