import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
// import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertybase';
import { environment } from 'src/environments/environment';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:5001/api/city');
  }

  getPropertyTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
  }

  getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(
      this.baseUrl + '/furnishingtype/list'
    );
  }

  getProperty(id: number) {
    return this.http.get<Property>(
      this.baseUrl + '/propperty/detail/' + id.toString()
    );
    // return this.getAllProperties().pipe(
    //   map((propertiesArray) => {
    //     // throw new Error('some error')
    //     return propertiesArray.find((p) => p.id === id);
    //   })
    // );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    // alert(SellRent + ' ' + typeof SellRent + '');

    return this.http.get<Property[]>(
      `https://localhost:5001/api/propperty/list/${SellRent}`
    );
  }

  // getAllProperties(SellRent?: number): Observable<Property[]> {
  //   return this.http.get<Property[]>(
  //     this.baseUrl + '/propperty/list/' + SellRent.toString()
  //   );
  // }

  addProperty(property: Property) {
    let newProp = [property];

    //Add new property ne array nese newProp veqse ekziston ne local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getPropertyAge(dateofEstablishment: string): string {
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    // Current month smaller than establishment month or
    // Same month but current date smaller than establishment date
    if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
      age--;
    }

    // Establshment date is future date
    if (today < estDate) {
      return '0';
    }

    // Age is less than a year
    if (age === 0) {
      return 'Less than a year';
    }

    return age.toString();
  }
}
