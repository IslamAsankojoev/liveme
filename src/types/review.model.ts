interface IReview {
  id?: number;
  message: string;
  rating: number;
  user: IUser;
  product: IProduct;
}
