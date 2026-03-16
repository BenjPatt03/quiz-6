import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { orderReducer } from './reducers/orderReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
