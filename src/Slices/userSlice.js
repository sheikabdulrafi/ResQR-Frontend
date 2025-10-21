// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  emergencies: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.emergencies = action.payload.emergencyHistories || [];
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.emergencies = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addEmergency: (state, action) => {
      state.emergencies.push(action.payload);
    },
    removeEmergency: (state, action) => {
      state.emergencies = state.emergencies.filter(
        (e) => e.historyId !== action.payload
      );
    },
  },
});

export const { setUser, clearUser, setLoading, setError, addEmergency, removeEmergency } = userSlice.actions;
export default userSlice.reducer;
