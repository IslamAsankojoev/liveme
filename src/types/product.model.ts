interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  sale_price?: number;
  full_description?: string;
  short_description?: string;
  rating?: number;
  published?: boolean;
  category?: ICategory
  gallery?: IGallery;
}
