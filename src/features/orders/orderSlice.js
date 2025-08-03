import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCancelledOrderApi, getAllOrdersApi, getOrderByIDApi, updateOrderStatusApi } from "./OrderApi";


// get all orders
export const getAllOrders = createAsyncThunk("/orders/all", async (_, thunkAPI) => {
  try {
    const res = await getAllOrdersApi();
    return res.data.orders;
  } catch (error) {
    console.error(`Failed to fetch Orders ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Fetch Orders"
    );
  }
});

// get Order by ID
export const getOrderByID = createAsyncThunk("/orders/getById", async (id, thunkAPI) => {
  try {
    const res = await getOrderByIDApi(id);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch Order by ID ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Fetch Order"
    );
  }
});


// update order status
export const updateOrderStatus = createAsyncThunk("/orders/updateStatus", async (id, thunkAPI) => {
  try {
    const res = await updateOrderStatusApi(id);
    return res.data;
  } catch (error) {
    console.error(`Failed to update Order status ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Update Order Status"
    );
  }
});

// delete cancelled order
export const deleteCancelledOrder = createAsyncThunk("/orders/deleteCancelled", async (id, thunkAPI) => {
  try {
    const res = await deleteCancelledOrderApi(id);
    return res.data;
  } catch (error) {
    console.error(`Failed to delete cancelled Order ${error.message}`);
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Failed To Delete Cancelled Order"
    );
  }
});

const initialState = {
  orders: null,
  vendorOrders:null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // all orders
    .addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(getAllOrders.fulfilled, (state,action)=>{
        state.isLoading =false;
        state.orders = action.payload;
    }).addCase(getAllOrders.rejected, (state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
    })
    // get order by ID
    .addCase(getOrderByID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(getOrderByID.fulfilled, (state, action) => { 
      state.isLoading = false;
      state.orders = state.orders.map(order => 
        order._id === action.payload._id ? action.payload : order
      );
    })
    .addCase(getOrderByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // update order status
    .addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
    }).addCase(updateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete cancelled order
    .addCase(deleteCancelledOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(deleteCancelledOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.filter(order => order._id !== action.payload._id);
    }).addCase(deleteCancelledOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});



export default ordersSlice.reducer
