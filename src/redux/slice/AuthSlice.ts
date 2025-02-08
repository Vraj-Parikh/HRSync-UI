import { TAuthApiResponseData } from "@/types/Auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetErrorMessage } from "@/helpers/utils";
import type { RootState } from "@/types/redux";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const fetchData = createAsyncThunk(
  "auth/refresh",
  async (_, ThunkAPI) => {
    try {
      const response = await api.get<TAuthApiResponseData>("/api/auth/refresh");
      return response.data.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
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
      if (action.payload) {
        state.accessToken = action.payload;
        state.authenticated = true;
      } else {
        state.accessToken = "";
        state.authenticated = false;
      }
    },
    logoutUser: (state) => {
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

export const { logoutUser, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
