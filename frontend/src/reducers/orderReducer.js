import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../constants/orderConstants';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  success: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };

    case ORDER_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
