import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  Id: number;
  SellRent: number;
  Name: string;
  FType: string;
  PType: string;
  BHK: number;
  BuiltArea: number;
  RTM: boolean;
  Image?: string;
  propertyTypeId: number;
  propertyType: string;
  furnishingTypeId: number;
  furnishingType: string;
  Price: number;
  CarpetArea?: number;
  Address: string;
  Address2?: string;
  // CityId: number;
  City: string;
  FloorNo?: string;
  TotalFloor?: string;
  readyToMove: boolean;
  Age?: string;
  MainEntrance?: string;
  Security?: number;
  Gated?: boolean;
  Maintenance?: number;
  Possession?:string;
  // estPossessionOn?: string;
  // photo?: string;
  Description?: string;
  // photos?: Photo[];
}
