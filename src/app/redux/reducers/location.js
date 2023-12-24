import vnfixerAPI from "@/app/api/vnfixerApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const locationSlice = createSlice({
  name: "location",
  initialState: {
    provinces: "",
    districts: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      });
  },
});

export const getProvinces = createAsyncThunk(
  "location/getProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const res = await vnfixerAPI.getAllProvince();
      if (res.status === 200) {
        return res.data;
      } else {
        throw rejectWithValue(res.data.message);
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
export const getDistricts = createAsyncThunk(
  "location/getDistricts",
  async (province, { rejectWithValue }) => {
    console.log(province);
    try {
      const res = await vnfixerAPI.getAllDistrict(province);
      if (res.status === 200) {
        return res.data.districts;
      } else {
        throw rejectWithValue(res.data.message);
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

export default locationSlice;

// import instance from "@/app/api/apiConfig";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// const locationSlice = createSlice({
//   name: "location",
//   initialState: {
//     province: "abc",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getProvince.fulfilled, (state, action) => {
//       console.log(state.province);
//       state.province = true;
//     });
//   },
// });

// export const getProvince = createAsyncThunk(
//   "location/getProvince",
//   async ({ endpoint, method, body }, { rejectWithValue }) => {
//     try {
//       const res = await instance(endpoint, method, body);
//       console.log(res);
//       //   if (res.status === 200) {
//       //     if (res.data.status === "success") {
//       //       Cookies.remove("access_token");
//       //     } else {
//       //       throw rejectWithValue(res.data.message);
//       //     }
//       //   }
//     } catch (error) {
//       if (error.payload) {
//         throw rejectWithValue(error.payload);
//       } else {
//         throw error;
//       }
//     }
//   }
// );

// export default locationSlice;
