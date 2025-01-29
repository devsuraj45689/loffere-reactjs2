import { createSlice } from '@reduxjs/toolkit';
import { generalConfigs } from 'configs';

export const initialModalState = {
  [generalConfigs.modals.login]: false,
  [generalConfigs.modals.register]: false,
  [generalConfigs.modals.forgotPassword]: false,
  [generalConfigs.modals.verifyMobile]: false,
};

export const initialState = {
  modals: initialModalState,
  modalRequiredData: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showHideModal: (state, action) => {
      state.modals[action.payload.modalName] = action.payload.value;
      state.modalRequiredData = action.payload?.data ?? null;
    },
  },
});

export const { showHideModal } = uiSlice.actions;

export default uiSlice.reducer;
