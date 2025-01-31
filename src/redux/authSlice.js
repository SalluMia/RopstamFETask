import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for signup
export const signUp = createAsyncThunk("auth/signUp", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed!");
  }
});

// Async thunk for login
export const signIn = createAsyncThunk("auth/signIn", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    localStorage.setItem("authToken", response.data.data.token);
    localStorage.setItem("authUser", JSON.stringify(response.data.data.userInfo));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Invalid credentials!");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    user: JSON.parse(localStorage.getItem("authUser")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    signOut(state) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.userInfo;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
