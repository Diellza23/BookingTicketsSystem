import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ResponseCode } from 'src/app/enums/responseCode';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { PropService } from 'src/app/services/prop.service';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-add-update-prop',
  templateUrl: './add-update-prop.component.html',
  styleUrls: ['./add-update-prop.component.scss'],
})
export class AddUpdatePropComponent implements OnInit {
  public headerTitle: string = 'Add Property';
  public confirmBtnTitle: string = 'Update';
  public sellRent: number;
  public name: string;
  public propertyType: string;
  public furnishingType: string;
  public price: number;
  public builtArea: number;
  public address: string;
  public address2: string;
  public city: string;
  public country: string;
  public floorNo: string;
  public totalFloors: string;
  public readyToMove: boolean = false;
  public mainEntrance: string;
  public security: number;
  public maintenance: number;
  public dateOfPossession: Date;
  public description: string;
  public propId: number = 0;

  public addUpdatePropForm;
  public modalResponse: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef,
    private propService: PropService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.modalResponse = new Subject();

    this.addUpdatePropForm = this.formBuilder.group({
      id: [''],
      sellRent: [''],
      name: [''],
      propertyType: [''],
      furnishingType: [''],
      price: [''],
      builtArea: [''],
      address: [''],
      address2: [''],
      city: [''],
      country: [''],
      floorNo: [''],
      totalFloors: [''],
      readyToMove: [''],
      mainEntrance: [''],
      security: [''],
      maintenance: [''],
      dateOfPossession: [''],
      description: [''],
    });
  }
  confirm() {
    this.propService
      .AddUpdateProp(
        this.propId,
        this.sellRent,
        this.name,
        this.propertyType,
        this.furnishingType,
        this.price,
        this.builtArea,
        this.address,
        this.address2,
        this.city,
        this.country,
        this.floorNo,
        this.totalFloors,
        this.readyToMove,
        this.mainEntrance,
        this.security,
        this.maintenance,
        this.dateOfPossession,
        this.description,
        this.user.id,
        false
      )
      .subscribe(
        (res) => {
          if (res.responseCode == ResponseCode.OK) {
            if (this.propId >= 0) {
              this.alertify.success('Property updated successfully');
            } else {
              this.alertify.success('Property saved successfully');
            }

            this.alertify.success('Property addedd successfully');
            this.bsModalRef.hide();
            this.modalResponse.next(true);
          } else {
            this.alertify.error('Something went wrong');
          }
        },
        () => {
          this.alertify.error('Something is not right!');
        }
      );
  }
  decline() {
    this.bsModalRef.hide();
    this.modalResponse.next(false);
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  }
}
