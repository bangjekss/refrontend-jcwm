const INITIAL_STATE = {
  productdb: [],
};

export const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        productdb: action.payload,
      };
    default:
      return state;
  }
};
