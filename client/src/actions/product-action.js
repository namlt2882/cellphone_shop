import * as Type from "./actions";

export const ProductAction = {
  setProducts: list => ({
    type: Type.SET_PRODUCTS,
    list
  }),
  setProduct: product => ({
    type: Type.SET_PRODUCT,
    product
  }),
  addProduct: product => ({
    type: Type.ADD_PRODUCT,
    product
  }),
  deleteProduct: product => ({
    type: Type.DELETE_PRODUCT,
    product
  })
};
