export class Prop {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  propertyTypeId: number;
  bhk: number;
  price: number;
  furnishingTypeId: number;
  furnishingType: string;
  builtArea: number;
  carpetArea: number;
  address: string;
  address2: string;
  city: string;
  cityId: number;
  floorNo: number;
  totalFloors: number;
  readyToMove: boolean;
  mainEntrance: string;
  security: number;
  gated: boolean;
  maintenance: number;
  estPossessionOn: Date;
  description: string;
  postedOn: Date;

  constructor(
    id: number = 0,
    sellRent: number = 1,
    name: string = '',
    propertyType: string = '',
    propertyTypeId: number,
    bhk: number = 0,
    furnishingType: string = '',
    furnishingTypeId: number = 0,
    price: number = 0,
    builtArea: number = 0,
    carpetArea: number = 0,
    address: string = '',
    address2: string = '',
    city: string = '',
    cityId: number = 0,
    floorNo: number = 0,
    totalFloors: number = 0,
    readyToMove: boolean = false,
    mainEntrance: string = '',
    security: number = 0,
    gated: boolean = false,
    maintenance: number = 0,
    estPossessionOn: Date = new Date(),
    description: string = '',
    postedOn: Date = new Date()
  ) {
    this.id = id;
    this.sellRent = sellRent;
    this.name = name;
    this.propertyType = propertyType;
    this.propertyTypeId = propertyTypeId;
    this.bhk = bhk;
    this.furnishingType = furnishingType;
    this.furnishingTypeId = furnishingTypeId;
    this.price = price;
    this.builtArea = builtArea;
    this.carpetArea = carpetArea;
    this.address = address;
    this.address2 = address2;
    this.city = city;
    this.cityId = cityId;
    this.floorNo = floorNo;
    this.totalFloors = totalFloors;
    this.readyToMove = readyToMove;
    this.mainEntrance = mainEntrance;
    this.security = security;
    this.gated = gated;
    this.maintenance = maintenance;
    this.estPossessionOn = estPossessionOn;
    this.description = description;
    this.postedOn = postedOn;
  }
}
