import { AuthRequest } from "./../utils/request";

export const ProductService = {
  getByCategory: categoryId => {
    return AuthRequest.get(`product?categoryId=${categoryId}`);
  },
  get: id => {
    return AuthRequest.get(`product/${id}`);
  },
  add: product => {
    return AuthRequest.post("product", product);
  }
};
