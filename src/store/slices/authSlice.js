// src/toolkit/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../services/api/authApi';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await authApi.login(credentials);
  localStorage.setItem('userDetail', JSON.stringify(response.data.data));
  return response.data.data;
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email) => {
    const response = await authApi.forgotPassword(email);
    return response.data;
  }
);

export const resetPasswordApi = createAsyncThunk(
  'auth/forgotPasswordVerification',
  async (resetdata) => {
    const response = await authApi.resetPassword(resetdata);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData) => {
    const response = await authApi.changePassword(passwordData);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData) => {
    const response = await authApi.resetPassword(resetData);
    return response.data;
  }
);

export const createPassword = createAsyncThunk(
  'auth/createPassword',
  async (createPasswordData) => {
    const response = await authApi.createPassword(createPasswordData);
    return response.data;
  }
);

export const socialRegister = createAsyncThunk(
  'auth/socialRegister',
  async (createPasswordData) => {
    const response = await authApi.socialMedia(createPasswordData);
    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyotp',
  async (verifydata) => {
    const response = await authApi.emailVerification(verifydata);
    return response.data;
  }
);

const initialState = {
  user: null,
  status: 'idle',
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    setUser:(state,action)=>{
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = action.status;
        state.user = action.payload.user;
        // state.token = action.payload.token;
        // localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(socialRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(socialRegister.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(socialRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout,setUser } = authSlice.actions;

export default authSlice.reducer;
