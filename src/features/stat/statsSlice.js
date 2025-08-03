import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllStatsApi, getOrderStatsApi } from "./statsApi";

export const getAllStats = createAsyncThunk("/stats", async (_, thunkAPI) => {
  try {
    const res = await getAllStatsApi();
    return res.data.stats;
  } catch (error) {
    console.error(`Failed to fetch Stats ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Fetch stats"
    );
  }
});


export const getOrderStats = createAsyncThunk("/stats/orders", async (_, thunkAPI) => { 
  try {
    const res = await getOrderStatsApi();
    console.log("Order Stats", res);
    return res.data.stats;

  } catch (error) {
    console.error(`Failed to fetch Order Stats ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Fetch Order Stats"
    );
  }
});


const initialState = {
  stats: [],
  orderStats: [],
  isLoading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getAllStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(getOrderStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(getOrderStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStats = action.payload;
      }).addCase(getOrderStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
