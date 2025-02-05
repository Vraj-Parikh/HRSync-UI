import api from "@/config/axios";
import { TAuthApiResponseData } from "@/types/Auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetErrorMessage } from "@/helpers/utils";
import type { RootState } from "@/types/redux";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "auth/refresh",
  async (_, ThunkAPI) => {
    try {
      const response = await api.get<TAuthApiResponseData>("/api/auth/refresh");
      return response.data.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return "";
      }
      const errorMessage = GetErrorMessage(error, "Error fetching data");
      return ThunkAPI.rejectWithValue(errorMessage);
    }
  }
);

type TStatus = "idle" | "loading" | "success" | "failed";
type TInitialState = {
  accessToken: string;
  authenticated: boolean;
  status: TStatus;
};
const initialState: TInitialState = {
  accessToken: "",
  authenticated: false,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.accessToken = "";
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (action.payload) {
          state.authenticated = true;
          state.accessToken = action.payload;
        }
        state.status = "success";
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const getAuthToken = (state: RootState) => state.auth.accessToken;
export const getStatus = (state: RootState) => state.auth.status;
export const getIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const { logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
