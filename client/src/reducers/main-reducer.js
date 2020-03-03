import { combineReducers } from "redux";
import { categories, category } from "./category-reducer";
import { products, product } from "./product-reducer";
import { system } from "./system-reducer";

export const MainReducer = combineReducers({
  system,
  categories,
  category,
  products,
  product
});
