import User from "./User.model";

interface Address {
  id: string;
  user: User;
  city: string;
  title: string;
  phone: string;
  street: string;
  country: string;
}

export default Address;
