import axios from "axios";
import Address from "models/Address.model";

const getAddressList = async (): Promise<Address[]> => {
  const response = await axios.get("/api/address/user");
  return response.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/address/address-ids");
  return response.data;
};

const getAddress = async (id: string): Promise<Address> => {
  const response = await axios.get("/api/address/user/1", { params: { id } });
  return response.data;
};

export default { getAddressList, getIds, getAddress };
