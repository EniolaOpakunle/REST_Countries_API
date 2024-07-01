import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBorderCountries = createAsyncThunk(
  'border/fetchBorderCountries',
  async (borders) => {
    const borderNames = await Promise.all(
      borders.map(async (border) => {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
        const borderCountryData = await res.json();
        return borderCountryData[0]?.name?.common || 'N/A';
      })
    );
    return borderNames;
  }
);

const borderSlice = createSlice({
  name: 'border',
  initialState: {
    borderCountries: [],
    isLoading: false,
    isError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorderCountries.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchBorderCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.borderCountries = action.payload;
      })
      .addCase(fetchBorderCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export default borderSlice;
