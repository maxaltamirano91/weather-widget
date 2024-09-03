import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const info = async () => {
//   try {
//     const response = await axios.get(
//       //   "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0674856062784cf284a93ba1a191e0df"
//       ` https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=0674856062784cf284a93ba1a191e0df`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const initialState = {
  weather: [],
  city: [],
};

export const weatherSlice = createSlice({
  name: "clima",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.weather = state.weather.concat(action.payload);
    },

    getCity: (state, action) => {
      state.city = state.city.concat(action.payload);
    },

    removeCity: (state) => {
      state.city = [];
    },

    removeWeather: (state) => {
      state.weather = [];
    },
  },
});

export const { getInfo, getCity, removeCity, removeWeather } =
  weatherSlice.actions;
