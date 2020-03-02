import { AuthRequest } from "./../utils/request";

export const CategoryService = {
  getAll: () => {
    return AuthRequest.get("category");
  },
  get: id => {
    return AuthRequest.get(`category/${id}`);
  },
  add: category => {
    return AuthRequest.post("category", category);
  }
};
