import axios from "axios";
import Product from "models/Product.model";

export const getFrequentlyBought = async (): Promise<Product[]> => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};

export const getRelatedProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/related-products");
  return response.data;
};
