interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRole;
  warehouse?: IWarehouse;
}
