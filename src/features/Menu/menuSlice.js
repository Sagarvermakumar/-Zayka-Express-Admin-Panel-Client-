import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMenuItemApi,
  deleteMenuItemApi,
  editMenuItemApi,
  getAllMenuItemsApi,
  getMenuItemByIdApi,
  toggleMenuItemAvailabilityApi
} from "./menuApi";
import toast from "react-hot-toast";

// create a new menu item
export const createMenuItem = createAsyncThunk(
  "/menu-item/create",
  async (data, thunkAPI) => {
    try {
      const res = await createMenuItemApi(data);
      console.log(' Res of Creating Menu : ', res)
      toast.success(res.data.message)
      return res.data;
    } catch (error) {
      toast.error( error.response?.data.message || "Failed To Create Menu Items")
      console.error(`Failed to Create Menus Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Create Menu Items"
      );
    }
  }
);

// get all menu items
export const getAllMenuItems = createAsyncThunk(
  "/menus",
  async (query, thunkAPI) => {
    try {
      const res = await getAllMenuItemsApi(query);
      return res.data;
    } catch (error) {
      console.error(`Failed to fetch Menus Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Fetch Menu Items"
      );
    }
  }
);



// edit a menu item
export const editMenuItem = createAsyncThunk(
  "/menu-item/edit",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await editMenuItemApi(id,data);
      toast.success(res.data.message)
      return res.data;
    } catch (error) {
      toast.error(error.data.message)
      console.error(`Failed to Edit Menus Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Edit Menu Items"
      );
    }
  }
);


// delete a menu item
export const deleteMenuItem = createAsyncThunk(
  "/menu-item/delete",
  async (id, thunkAPI) => {
    try {
      const res = await deleteMenuItemApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to Delete Menus Items ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Delete Menu Items"
      );
    }
  }
);


// get menu item by id
export const getMenuItemById = createAsyncThunk(
  "/menu-item",
  async (id, thunkAPI) => {
    try {
      const res = await getMenuItemByIdApi(id);
      return res.data;
    } catch (error) {
      console.error(`Failed to Fetch Menu Item ${error.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Fetch Menu Item"
      );
    }
  }
);

// toggle menu item availability
export const toggleMenuItemAvailability = createAsyncThunk(
  "/menu-item/toggle",
  async (menuitemId, thunkAPI) => {
    try {
      const res = await toggleMenuItemAvailabilityApi(menuitemId);
      toast.success(res.data.message)
      return res.data;
    } catch (error) {
      console.error(`Failed to Toggle Menu Item Availability ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed To Toggle Menu Item Availability"
      );
    }
  }
);

// initial state
const initialState = {
  menusItem: null,
  newMenuItem: null,
  itemDetails:null,
  isLoading: false,
  isAddMenuItemLoading:false,
  isAddingItemLoader :false,
  error: null,
};

const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create a new menu item
      .addCase(createMenuItem.pending, (state) => {
        state.isAddMenuItemLoading = true;
        state.error = null;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.isAddMenuItemLoading = false;
        state.newMenuItem = action.payload;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.isAddMenuItemLoading = false;
        state.error = action.payload;
        state.newMenuItem = null;
      }).addCase(getAllMenuItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menusItem = action.payload.menuItems;
      })
      .addCase(getAllMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // edit menu item
      .addCase(editMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newMenuItem = action.payload;
      })
      .addCase(editMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.newMenuItem = null;
      })
      // delete menu item
      .addCase(deleteMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menusItem = state.menusItem.filter(
          (menu) => menu._id !== action.payload._id
        );
        toast.success(action.payload.message)
      }
      )
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message)
      })
      // get menu item by id
      .addCase(getMenuItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenuItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemDetails = action.payload.item;
      })
      .addCase(getMenuItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // toggle menu item availability
      .addCase(toggleMenuItemAvailability.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleMenuItemAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedMenuItem = action.payload.updatedItem;
        state.menusItem = state.menusItem.map((menu) =>
          menu._id === updatedMenuItem._id ? updatedMenuItem : menu
        );
      })
      .addCase(toggleMenuItemAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default menuItemsSlice.reducer;
