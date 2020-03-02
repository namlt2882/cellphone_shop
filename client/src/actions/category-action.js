import * as Type from "./actions";

export const CategoryAction = {
  setCategories: list => ({
    type: Type.SET_CATEGORIES,
    list
  }),
  setCategory: cat => ({
    type: Type.SET_CATEGORY,
    cat
  }),
  addCategory: cat => ({
    type: Type.ADD_CATEGORY,
    cat
  }),
  deleteCategory: cat => ({
    type: Type.DELETE_CATEGORY,
    cat
  })
};
