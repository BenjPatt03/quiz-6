import axiosInstance from '../axiosInstance';
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

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const response = await axiosInstance.post('/api/v1/users/login/', {
      email,
      password,
    });

    const { access, refresh } = response.data;
    // Fetch user profile to get role and other info
    const userResponse = await axiosInstance.get('/api/v1/users/profile/', {
      headers: { Authorization: `Bearer ${access}` },
    });

    const userData = {
      token: access,
      refreshToken: refresh,
      id: userResponse.data.id,
      username: userResponse.data.username,
      email: userResponse.data.email,
      role: userResponse.data.role,
      merchant_id: userResponse.data.merchant_id,
    };

    localStorage.setItem('userInfo', JSON.stringify(userData));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.detail || 'Login failed',
    });
  }
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    await axiosInstance.post('/api/v1/users/register/', userData);

    dispatch({ type: USER_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data || 'Registration failed',
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

// Get user profile action
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const response = await axiosInstance.get('/api/v1/users/profile/');

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response?.data?.detail || 'Failed to get profile',
    });
  }
};
