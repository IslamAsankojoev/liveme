import axios from "axios";
import Shop from "models/Shop.model";

export const getShopList = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/shops");
  return response.data;
};

export const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const response = await axios.get("/api/shops/slugs");
  return response.data;
};

export const getProductsBySlug = async (slug: string): Promise<Shop> => {
  const response = await axios.get("/api/shops/single", { params: { slug } });
  return response.data;
};

export default { getShopList, getSlugs, getProductsBySlug };
