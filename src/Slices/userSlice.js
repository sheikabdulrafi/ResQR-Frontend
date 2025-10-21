// src/redux/Slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ Load user from localStorage on startup
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  currentUser: storedUser,
  emergencies: storedUser?.emergencyHistories || [],
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
      // ✅ Save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.emergencies = [];
      // ✅ Remove user from localStorage
      localStorage.removeItem("user");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addEmergency: (state, action) => {
      state.emergencies.push(action.payload);
      // ✅ Update emergencies in stored user
      const updatedUser = {
        ...state.currentUser,
        emergencyHistories: state.emergencies,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    removeEmergency: (state, action) => {
      state.emergencies = state.emergencies.filter(
        (e) => e.historyId !== action.payload
      );
      // ✅ Update localStorage
      const updatedUser = {
        ...state.currentUser,
        emergencyHistories: state.emergencies,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  addEmergency,
  removeEmergency,
} = userSlice.actions;
export default userSlice.reducer;
