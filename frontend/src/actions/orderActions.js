import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../constants/orderConstants';
import axiosInstance from '../axiosInstance';

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axiosInstance.post('/orders/create/', orderData, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    dispatch({ type: ORDER_CREATE_FAIL, payload: errorMessage });
  }
};

export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const { data } = await axiosInstance.get('/orders/my-orders/');

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: errorMessage });
  }
};
