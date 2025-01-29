// src/toolkit/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postApi from '../services/api/postApi';

export const categoryGet = createAsyncThunk('post/categoryGet', async () => {
  const response = await postApi.getCategory();
  return response.data.records;
});

export const subCategoryGet = createAsyncThunk(
  'post/subCategoryGet',
  async (categoryDetail) => {
    const response = await postApi.getSubCategory(categoryDetail);
    return response.data.records;
  }
);

export const postProduct = createAsyncThunk(
  'post/postProduct',
  async (postData) => {
    const response = await postApi.postProduct(postData);
    return response.data;
  }
);

export const postDropDownValues = createAsyncThunk(
  'post/postDropDownValues',
  async (postData) => {
    const response = await postApi.getDropDown(postData);
    return response.data.records;
  }
);

export const getCountries = createAsyncThunk('get/getCountries', async () => {
  const response = await postApi.getCountries();
  // return response.data.records;
  // Filter the response to only include Morocco
  const morocco = response.data.records.filter(
    (country) => country.isoCode === 'MA'
  );
  return morocco; // Only return Morocco
});

export const getStates = createAsyncThunk(
  'get/getStates',
  async (countryCode) => {
    const response = await postApi.getStates(countryCode);
    return response.data.records;
  }
);

export const getCities = createAsyncThunk('get/getCities', async (code) => {
  const response = await postApi.getCities(code);
  return response.data.records;
});

export const postJob = createAsyncThunk('post/postJob', async (code) => {
  const response = await postApi.postJob(code);
  return response.data.records;
});

const initialState = {
  category: [],
  subCategory: [],
  dropDownValues: [],
  countries: [],
  states: [],
  cities: [],
  status: 'idle',
  token: null,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    logout: (state) => {
      state.category = [];
      state.subCategory = [];
      state.countries = [];
      state.status = 'idle';
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryGet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(categoryGet.fulfilled, (state, action) => {
        // state.status = action.status;
        state.category = action.payload;
        // state.token = action.payload.token;
        // localStorage.setItem("token", action.payload.token);
      })
      .addCase(categoryGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(subCategoryGet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subCategoryGet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subCategory = action.payload;
      })
      .addCase(postProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.subCategory = action.payload
      })
      .addCase(postDropDownValues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postDropDownValues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dropDownValues = action.payload;
        // state.subCategory = action.payload
      })
      .addCase(getCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(getStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.states = action.payload;
      })
      .addCase(getCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(postJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.subCategory = action.payload
      });
  },
});

export const { logout } = postSlice.actions;

export default postSlice.reducer;
