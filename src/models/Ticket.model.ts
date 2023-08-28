import User from "./User.model";

interface Ticket {
  user: User;
  id: string;
  slug: string;
  type: string;
  date: string;
  title: string;
  status: string;
  category: string;
  conversation?: any;
}

export default Ticket;
