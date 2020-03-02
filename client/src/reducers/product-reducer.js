import * as Type from "../actions/actions";

export const products = (state = [], { type, list, cat: product }) => {
  var index;
  switch (type) {
    case Type.SET_PRODUCTS:
      state = list;
      return [...state];
    case Type.ADD_PRODUCT:
      state.unshift(product);
      return [...state];
    case Type.DELETE_PRODUCT:
      if (product) {
        index = state.findIndex(t => t._id === product._id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
      return [...state];
    default:
      return [...state];
  }
};

export const product = (state = null, { type, cat }) => {
  switch (type) {
    case Type.SET_PRODUCT:
      state = cat;
      return { ...state };
    default:
      return { ...state };
  }
};
