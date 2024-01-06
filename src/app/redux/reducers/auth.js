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
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.isLoggedIn = true;
          state.currentUser = action.payload?.user;
          Cookies.set("INFO", JSON.stringify(state.currentUser));
        }
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/login`, { email, password });
      const response = res.data.user;
      if (res.status === 200) {
        Cookies.set("access_token", res.data.accessToken);
        const user = {
          id: response?.id ?? "",
          email: response?.email ?? "",
          fullName: response?.fullName ?? "",
          avatar: response?.imageUrl ?? "",
          phone: response?.phone ?? "",
          address: response?.address ?? "",
          agencyRole: response?.agencyRole ?? "",
          branchId: response?.branchId ?? "",
          role: response?.role ?? "",
          city: response?.branch?.city ?? "",
          agencyId: response?.branch?.agencyId ?? "",
          categoryId: response?.branch?.agency?.categoryId ?? "",
        };
        return { user };
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.put(`/users/information`, data);
      if (res.status === 200) {
        const response = res.data;
        const user = {
          id: response?.id ?? "",
          email: response?.email ?? "",
          fullName: response?.fullName ?? "",
          avatar: response?.imageUrl ?? "",
          phone: response?.phone ?? "",
          address: response?.address ?? "",
          agencyRole: response?.agencyRole ?? "",
          branchId: response?.branchId ?? "",
          role: response?.role ?? "",
          city: response?.branch?.city ?? "",
          agencyId: response?.branch?.agencyId ?? "",
          categoryId: response?.branch?.agency?.categoryId ?? "",
        };
        return { user };
      }
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.message);
    }
    // try {
    //   const formData = new FormData();
    //   if (avatar) {
    //     formData.append("avatar", avatar.base64);
    //   }
    //   formData.append("idUser", id);
    //   formData.append("username", username);
    //   formData.append("email", email);
    //   const res = await instance.post(`/user/update`, formData);
    //   if (res.status === 200) {
    //     if (res.data.status === "success") {
    //       return res.data.data;
    //     } else {
    //       throw rejectWithValue(res.data.message);
    //     }
    //   }
    // } catch (error) {
    //   if (error.payload) {
    //     throw rejectWithValue(error.payload);
    //   } else {
    //     throw error;
    //   }
    // }
  }
);

export default authSlice;
