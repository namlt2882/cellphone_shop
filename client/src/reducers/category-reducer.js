import * as Type from "../actions/actions";

export const categories = (state = [], { type, list, cat }) => {
  var index;
  switch (type) {
    case Type.SET_CATEGORIES:
      state = list;
      return [...state];
    case Type.ADD_CATEGORY:
      state.unshift(cat);
      return [...state];
    case Type.DELETE_CATEGORY:
      if (cat) {
        index = state.findIndex(t => t._id === cat._id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
      return [...state];
    default:
      return [...state];
  }
};

export const category = (state = null, { type, cat }) => {
  switch (type) {
    case Type.SET_CATEGORY:
      state = cat;
      return { ...state };
    default:
      return { ...state };
  }
};
