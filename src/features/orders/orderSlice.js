import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCancelledOrderApi, getAllOrdersApi, getOrderByIDApi, updateOrderStatusApi } from "./OrderApi";
import {toast} from 'react-hot-toast'

// get all orders
export const getAllOrders = createAsyncThunk("/orders/all", async (selectDate, thunkAPI) => {
  try {

    
    const res = await getAllOrdersApi(selectDate);
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
export const updateOrderStatus = createAsyncThunk("/orders/updateStatus", async ({id,status}, thunkAPI) => {
  try {
   
    const res = await updateOrderStatusApi(id,status);
    toast.success(res.data.message)
    return res.data;
  } catch (error) {
    console.error(`Failed to update Order status ${error}`);
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
  isLoadingAllOrders :false,
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
      state.isLoadingAllOrders = true;
      state.error = null;
    }).addCase(getAllOrders.fulfilled, (state,action)=>{
        state.isLoadingAllOrders =false;
        state.orders = action.payload;
    }).addCase(getAllOrders.rejected, (state,action)=>{
        state.isLoadingAllOrders = false;
        state.error = action.payload;
        state.orders = null
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
        order._id === action.payload.id ? action.payload.order : order
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
      state.orders = state.orders.filter(order => order._id !== action.payload.orderId);
      toast.success(action.payload.message || "Order Deleted Successfully")
    }).addCase(deleteCancelledOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload || "Failed To delete Order")
    });
  },
});



export default ordersSlice.reducer
