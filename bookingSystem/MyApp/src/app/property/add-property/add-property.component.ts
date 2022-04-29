import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes:Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes:Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView:IProperty= {
    Id: null,
    Name: '',
    Price:null,
    SellRent:null,
    Type:null
  };


  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    console.log('Congrats form submitted');
    console.log(this.addPropertyForm);
  }
  selectTab(tabId:number){
    this.formTabs.tabs[tabId].active=true;
  }
}
