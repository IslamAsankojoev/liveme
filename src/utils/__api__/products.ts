import axios from "axios";
import Product from "models/Product.model";

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

// get product based on slug
const getProduct = async (slug: string): Promise<Product> => {
  const response = await axios.get("/api/products/slug", { params: { slug } });
  return response.data;
};

// search profucts
const searchProducts = async (
  name?: string,
  category?: string
): Promise<string[]> => {
  const response = await axios.get("/api/products/search", {
    params: { name, category },
  });
  return response.data;
};

export default { getSlugs, getProduct, searchProducts };
