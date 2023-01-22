import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, publish } from 'rxjs';
import { ResponseCode } from '../enums/responseCode';
import { Constants } from '../Helper/constants';
import { Prop } from '../Models/prop';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PropService {
  constructor(private httpClient: HttpClient) {}

  public deleteProp(propId: number) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    const body = {
      Id: propId,
    };
    return this.httpClient.post<ResponseModel>(
      Constants.BASE_URL + 'Propperty/DeleteProperty',
      body,
      { headers: headers }
    );
  }

  public getPropsByAuthorId(authorId: string) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({});
    return this.httpClient
      .get<ResponseModel>(
        Constants.BASE_URL + 'Propperty/GetPropertyList?AuthorId=' + authorId,
        {
          headers: headers,
        }
      )
      .pipe(
        map((res) => {
          let propertyList = new Array<Prop>();
          if (res.responseCode == ResponseCode.OK) {
            if (res.dateSet) {
              res.dateSet.map((x: any) => {
                propertyList.push(
                  new Prop(
                    x.id,
                    x.sellRent,
                    x.name,
                    x.propertyTypeId,
                    x.furnishingTypeId,
                    x.price,
                    x.bhk,
                    x.builtArea,
                    x.cityId,
                    x.readyToMove,
                    x.address,
                    x.address2,
                    x.floorNo,
                    x.totalFloors,
                    x.mainEntrance,
                    x.security,
                    x.maintenance,
                    x.estPossessionOn,
                    x.description,
                    x.postedOn
                  )
                );
              });
            }
          }
          return propertyList;
        })
      );
  }
  public AddUpdateProp(
    propId: number,
    sellRent: number,
    name: string,
    propertyType: string,
    furnishingType: string,
    price: number,
    builtArea: number,
    address: string,
    address2: string,
    city: string,
    country: string,
    floorNo: string,
    totalFloors: string,
    readyToMove: boolean,
    mainEntrance: string,
    security: number,
    maintenance: number,
    dateOfPossession: Date,
    description: string,
    userId: string,
    publish: boolean
  ) {
    let userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userInfo?.token}`,
    });
    const body = {
      Id: propId,
      SellRent: sellRent,
      Name: name,
      PropertyType: propertyType,
      FurnishingType: furnishingType,
      Price: price,
      BuiltArea: builtArea,
      Address: address,
      Address2: address2,
      City: city,
      Country: country,
      FloorNo: floorNo,
      TotalFloors: totalFloors,
      ReadyToMove: readyToMove,
      MainEntrance: mainEntrance,
      Security: security,
      Maintenance: maintenance,
      DateOfPossession: dateOfPossession,
      Description: description,
      AppUserId: userId,
      Publish: publish,
    };
    return this.httpClient.put<ResponseModel>(
      `https://localhost:5001/api/propperty/UpdProperty?id=${propId}`,
      //  `Propperty/UpdProperty?id=${propId}`,
      body,
      { headers: headers }
    );
  }
}
