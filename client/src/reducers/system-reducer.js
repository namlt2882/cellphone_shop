import * as Type from "../actions/actions";

export const system = (
  state = {
    categoryId: null
  },
  { type, categoryId }
) => {
  switch (type) {
    case Type.SET_CHOSSING_CATEGORY:
      state.categoryId = categoryId;
      return { ...state };
    default:
      return { ...state };
  }
};
