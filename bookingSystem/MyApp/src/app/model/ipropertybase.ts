import { Photo } from './photo';

export interface IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  furnishingType: string;
  propertyType: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  country: string;
  readyToMove: boolean;
  photo?: string;
  photos?: Photo[];
  estPossessionOn?: string;
  description?: string;
  appUserId?: string;
}
