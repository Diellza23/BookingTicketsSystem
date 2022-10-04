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
  readyToMove: boolean;
  image?: string;
  estPossessionOn?: string;
}
