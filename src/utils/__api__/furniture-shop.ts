import axios from "axios";
import Product from "models/Product.model";
import CategoryNavList from "models/CategoryNavList.model";
import { FurnitureCarouselItem } from "models/Carousel.model";

const getTopNewProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/furniture-shop/products?tag=new");
  return response.data;
};

const getTopSellingProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/furniture-shop/products?tag=top-selling"
  );
  return response.data;
};

const getFurnitureProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/furniture-shop/all-products");
  return response.data;
};

const getFurnitureShopNavList = async (): Promise<CategoryNavList[]> => {
  const response = await axios.get("/api/furniture-shop/navigation");
  return response.data;
};

const getMainCarouselData = async (): Promise<FurnitureCarouselItem[]> => {
  const response = await axios.get("/api/furniture-shop/main-carousel");
  return response.data;
};

export default {
  getTopNewProducts,
  getMainCarouselData,
  getFurnitureProducts,
  getTopSellingProducts,
  getFurnitureShopNavList,
};
