import axios from "axios";
import Order from "models/Order.model";

const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get("/api/users/orders");
  return response.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
};

const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get("/api/users/order", { params: { id } });
  return response.data;
};

export default { getOrders, getOrder, getIds };
