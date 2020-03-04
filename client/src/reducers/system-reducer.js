import * as Type from "../actions/actions";

export const MAX_RANGE_VALUE = 2000;

export const system = (
  state = {
    categoryId: null,
    sortType: 0,
    rangeValue: [0, MAX_RANGE_VALUE]
  },
  { type, categoryId, sortType, rangeValue }
) => {
  switch (type) {
    case Type.SET_CHOSSING_CATEGORY:
      state.categoryId = categoryId;
      return { ...state };
    case Type.SET_SORT_TYPE:
      state.sortType = sortType;
      return { ...state };
    case Type.SET_RANGE_VALUE:
      state.rangeValue = rangeValue;
      return { ...state };
    default:
      return { ...state };
  }
};
