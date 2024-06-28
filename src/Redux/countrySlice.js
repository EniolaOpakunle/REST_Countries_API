import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: createDefaultState(),
};

function createDefaultState() {
  return {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
  };
}

const fetchCountryData = async (url, thunkAPI) => {
  try {
    console.log('hello')
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return thunkAPI.rejectWithValue("Failed to fetch FAQs.");
  }
};

export const fetchCountries = createAsyncThunk(
  "countrySlice/fetchCountries",
  async (_, thunkAPI) => {
    const url = "https://restcountries.com/v3.1/all";
    return await fetchCountryData(url, thunkAPI);
  }
);

export const countrySlice = createSlice({
  name: "countrySlice",
  initialState,
  reducers: {
    reset_data: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countries.isLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries.isLoading = false;
        state.countries.isSuccess = true;
        state.countries.isError = false;
        state.countries.message = null;
        state.countries.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries.isLoading = false;
        state.countries.isError = true;
        state.countries.isSuccess = false;
        state.countries.message = action.error.message;
        state.countries.data = null;
      });
  },
});

export const { reset_data } = countrySlice.actions;

export default countrySlice.reducer;