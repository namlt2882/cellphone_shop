import * as Type from "./actions";

export const SystemAction = {
  setChoosingCategory: categoryId => ({
    type: Type.SET_CHOSSING_CATEGORY,
    categoryId
  })
};
