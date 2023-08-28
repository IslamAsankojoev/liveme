import axios from "axios";
import User from "models/User.model";

export const getUser = async (): Promise<User[]> => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};

export const getUserIds = async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export default { getUser, getUserIds };
