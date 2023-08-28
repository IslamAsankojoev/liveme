import axios from "axios";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Category from "models/Category.model";
import { GiftCarouselItem } from "models/Carousel.model";
import CategoryNavList from "models/CategoryNavList.model";

const getMainCarouselData = async (): Promise<GiftCarouselItem[]> => {
  const response = await axios.get("/api/gift-shop/main-carousel");
  return response.data;
};

const getCategoryNavigation = async (): Promise<CategoryNavList[]> => {
  const response = await axios.get("/api/gift-shop-navigation");
  return response.data;
};

const getPopularProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products?tag=popular");
  return response.data;
};

const getTopSailedProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products?tag=top-sailed");
  return response.data;
};

const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/gift-shop/products");
  return response.data;
};

const getServiceList = async (): Promise<Service[]> => {
  const response = await axios.get("/api/gift-shop/service-list");
  return response.data;
};

const getTopCategories = async (): Promise<Partial<Category>[]> => {
  const response = await axios.get("/api/gift-shop/top-categories");
  return response.data;
};

export default {
  getAllProducts,
  getServiceList,
  getTopCategories,
  getPopularProducts,
  getMainCarouselData,
  getTopSailedProducts,
  getCategoryNavigation,
};
