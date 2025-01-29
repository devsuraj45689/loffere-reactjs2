// src/toolkit/reducers/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import postReducer from '../slices/postSlice';
import uiReducer from '../slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  ui: uiReducer,
});

export default rootReducer;
