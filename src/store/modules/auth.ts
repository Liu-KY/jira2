import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/searchPanel";
import { RootState } from "store";
import * as auth from "auth-provider";
import { http } from "utils/http";

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(bootstrap.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const login = createAsyncThunk("auth/login", auth.login);

export const register = createAsyncThunk("auth/register", auth.register);

export const logout = createAsyncThunk("auth/logout", auth.logout);

export const bootstrap = createAsyncThunk(
  "auth/bootstra",
  async (): Promise<null | User> => {
    let user = null;
    const token = auth.getToken();
    if (token) {
      const data = await http("me", { token });
      user = data.user;
    }
    return user;
  }
);

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
