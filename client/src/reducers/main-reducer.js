import { combineReducers } from "redux";
import { categories, category } from "./category-reducer";
import { products, product } from "./product-reducer";

export const MainReducer = combineReducers({
  categories,
  category,
  products,
  product
});
