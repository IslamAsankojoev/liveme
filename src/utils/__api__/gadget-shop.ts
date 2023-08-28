import axios from "axios";
import Blog from "models/Blog.model";
import Product from "models/Product.model";
import Category from "models/Category.model";
import { Banner } from "models/Gadget.model";

const getFeaturedCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/gadget-store/featured-categories");
  return response.data;
};

const getTwoBanner = async (): Promise<Banner[]> => {
  const response = await axios.get("/api/gadget-store/two-banners");
  return response.data;
};

const getBlogLists = async (): Promise<Blog[]> => {
  const response = await axios.get("/api/gadget-store/blog-lists");
  return response.data;
};

const getMainCarousel = async () => {
  const response = await axios.get("/api/gadget-store/main-carousel");
  return response.data;
};

const getTopPicksList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-store/products?tag=top-picks");
  return response.data;
};

const getMostViewedList = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=most-viewed"
  );
  return response.data;
};

const getNewArrival = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=new-arrival"
  );
  return response.data;
};

export default {
  getTwoBanner,
  getBlogLists,
  getNewArrival,
  getMainCarousel,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories,
};
