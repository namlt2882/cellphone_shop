import { AuthRequest } from "./../utils/request";

export const ProductService = {
  getAll: () => {
    return AuthRequest.get("product");
  },
  get: id => {
    return AuthRequest.get(`product/${id}`);
  },
  add: product => {
    return AuthRequest.post("product", product);
  }
};
