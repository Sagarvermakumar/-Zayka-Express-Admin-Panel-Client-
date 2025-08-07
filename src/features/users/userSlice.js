import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blockUserApi, deleteUserProfileApi, getAllUsersApi, getUserByIdApi, unblockUserApi, updateUserRoleApi } from "./userApi";
import toast from "react-hot-toast";

//get all users
export  const getAllUsers = createAsyncThunk("user/user-list",
  async(query,thunkAPI)=>{
    try {
      const { data } = await getAllUsersApi(query);
      return data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to fetch all users"
      );
    }
  
  }
);

//get users by Id
export const getUserById =  createAsyncThunk("user/details",
  async(id,thunkAPI)=>{
    try {
      const { data } = await getUserByIdApi(id);
     console.log("User Details Data", data);
      return data;
    } catch (error) {
      console.error("Error fetching user details  :", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to fetch user details"
      );
    }
  
  }
);

// Block User
export const blockUser = createAsyncThunk("user/block",
  async (id, thunkAPI) => {
    try {
      console.log("Blocking user with ID:", id);
      // Call the block user API
      const { data } = await blockUserApi(id);
      if (data.status) {
        toast.success("User Blocked Successfully");
      }
      return data;
    } catch (error) {
      console.error("Error blocking user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to block user"
      );
    }
  }
);  

// Unblock User
export const unblockUser = createAsyncThunk("user/unblock",
  async (id, thunkAPI) => {
    try {
      const { data } = await unblockUserApi(id);
      if (data.status) {
        toast.success(data.message || "User Unblocked Successfully");
      }
      return data;
    } catch (error) {
      console.error("Error unblocking user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to unblock user"
      );
    }
  }
);

// update user role
export const updateUserRole = createAsyncThunk("user/update-role",
  async ({ id, data }, thunkAPI) => {
    try {
      const { data: responseData } = await updateUserRoleApi(id, data);
      if (responseData.status) {
        toast.success(responseData.message || "User Role Updated Successfully");
      }
      return responseData;
    } catch (error) {
      console.error("Error updating user role:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to update user role"
      );
    }
  }
);  

// delete user profile
export const deleteUserProfile = createAsyncThunk("user/delete-profile",
  async (id, thunkAPI) => {
    try {
      const { data } = await deleteUserProfileApi(id);
      if (data.status) {
        toast.success(data.message );
       
      }
      return data;
    } catch (error) {
      console.error("Error deleting user profile:", error.response?.data?.message);
      toast.error(error.response?.data?.message)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message 
      );
    }
  }
);

const initialState = {
  usersList: null,
  userDetails: null,
  isLoading: false,
  isLoadingUsers:false,
  isLoadingChangeUserStatus:false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoadingUsers = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoadingUsers = false;
        state.usersList = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoadingUsers = false;
        state.error = action.payload;
        toast.error("Failed to Fetch All Users");
      })
      // get user by ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to Fetch User Details");
      })
      // block user
      .addCase(blockUser.pending, (state) => {
        state.isLoadingChangeUserStatus = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoadingChangeUserStatus = false;
        console.log(action.payload.user)
    
         state.userDetails = {
    ...state.userDetails, // keep old info
    ...action.payload.user, // merge new info
    status: 'blocked' // override status manually
  };
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoadingChangeUserStatus = false;
        state.error = action.payload;
        toast.error("Failed to Block User");
      })
      // unblock user
      .addCase(unblockUser.pending, (state) => {
        state.isLoadingChangeUserStatus = true;
        state.error = null;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.isLoadingChangeUserStatus = false;
        state.userDetails = {
        ...state.userDetails,
        ...action.payload.user,
        status: 'active'
  };
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.isLoadingChangeUserStatus = false;
        state.error = action.payload;
        toast.error("Failed to Unblock User");
      })
      // update user role
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUsers = state.usersList.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
        state.usersList = updatedUsers;
        toast.success("User Role Updated Successfully");
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to Update User Role");
      })
      // delete user profile
      .addCase(deleteUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = state.usersList.filter(
          (user) => user._id !== action.payload.user._id
        );
        toast.success(`${action.payload.message}`);
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});



export default userSlice.reducer
