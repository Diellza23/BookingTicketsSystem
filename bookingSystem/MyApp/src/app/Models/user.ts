export class User {
  public id: string = '';
  public fullName: string = '';
  public email: string = '';
  public userName: string = '';
  public roles: string[] = [];

  constructor(
    id: string,
    fullName: string,
    email: string,
    userName: string,
    roles: string[]
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.userName = userName;
    this.roles = roles;
  }
}
