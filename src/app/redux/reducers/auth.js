import instance from "@/app/api/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: Cookies.get("LOGGED") === "true",
    role: Cookies.get("ROLE") ? Cookies.get("ROLE") : "guest",
    currentUser: Cookies.get("INFO") ? JSON.parse(Cookies.get("INFO")) : [],
    messageError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.messageError = "";
        if (action.payload?.user) {
          state.isLoggedIn = true;
          state.currentUser = action.payload?.user;
          Cookies.set("LOGGED", JSON.stringify(state.isLoggedIn));
          Cookies.set("INFO", JSON.stringify(state.currentUser));
        } else {
          state.messageError = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = {};
        state.cart = [];
        Cookies.remove("LOGGED", JSON.stringify(state.isLoggedIn));
        Cookies.remove("INFO", JSON.stringify(state.currentUser));
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser));
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser));
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/login`, { email, password });
      if (res.status === 200) {
        Cookies.set("access_token", res.data.accessToken);
        return {
          user: {
            // id: res.data.data.id,
            // role: res.data.data.role,
            // fullName: res.data.data.fullName,
            // avatar: res.data.data.avatar,
            // phone: res.data.data.phone,
            // address: res.data.data.address,
            // email: res.data.data.email,
          },
        };
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        return error.response.data.message;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // const res = await instance.get(`/auth/logout`);
      Cookies.remove("access_token");
      // if (res.status === 200) {
      //   if (res.data.status === "success") {
      //     Cookies.remove("access_token");
      //   } else {
      //     throw rejectWithValue(res.data.message);
      //   }
      // }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const id = Cookies.get("uid");
      const res = await instance.post(`/auth/refresh-token`, { id });
      if (res.status === 200) {
        if (res.data.status === "success") {
          Cookies.set("access_token", res.data.data.access_token);
          return res.data.data.user;
        } else {
          Cookies.remove("access_token");
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateInfo = createAsyncThunk(
  "auth/updateInfo",
  async (
    { id, username, email, avatar, address, phone },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar.base64);
      }
      formData.append("idUser", id);
      formData.append("username", username);
      formData.append("email", email);
      const res = await instance.post(`/user/update`, formData);
      if (res.status === 200) {
        if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export default authSlice;
