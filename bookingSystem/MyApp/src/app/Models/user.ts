export class User {
  public id: string = '';
  public fullName: string = '';
  public email: string = '';
  public userName: string = '';
  public roles: string[] = [];
  public phoneNumber: string = '';
  public address: string = '';
  public state: string = '';
  public country: string = '';

  constructor(
    id: string,
    fullName: string,
    email: string,
    userName: string,
    roles: string[],
    phoneNumber: string,
    address: string,
    state: string,
    country: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.userName = userName;
    this.roles = roles;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.state = state;
    this.country = country;
  }
}
