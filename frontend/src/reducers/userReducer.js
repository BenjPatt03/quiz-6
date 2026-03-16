import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../constants/userConstants';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
  registerSuccess: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        loading: false,
        error: null,
      };

    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...initialState,
        userInfo: null,
      };

    default:
      return state;
  }
};
