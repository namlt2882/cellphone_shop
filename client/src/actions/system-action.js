import * as Type from "./actions";

export const SystemAction = {
  setChoosingCategory: categoryId => ({
    type: Type.SET_CHOSSING_CATEGORY,
    categoryId
  }),
  setSortType: sortType => ({
    type: Type.SET_SORT_TYPE,
    sortType
  }),
  setRangeValue: rangeValue => ({
    type: Type.SET_RANGE_VALUE,
    rangeValue
  })
};
