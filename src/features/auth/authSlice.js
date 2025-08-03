import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getProfileApi,
  loginAdminApi,
  logoutUserApi,
  updateAvatarApi,
  updateProfileApi
} from "./authApi";



// login as admin
export const loginAdmin = createAsyncThunk(
  "auth/login/admin",
  async (data, thunkAPI) => {
    try {
  
      const response = await loginAdminApi(data);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileApi();
      return response.data.user;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUserApi();
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error( error.response?.data?.message || "Logout failed")
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Update Profile Details
export const updateProfileDetails = createAsyncThunk("user/update-details",(async(_,thunkAPI)=>{
    try {
      const response = await updateProfileApi();
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error( error.response?.data?.message || "Update Profile Details Failed")
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update Profile Details Failed"
      );
    }
}))

// update avatar
export const updateAvatar = createAsyncThunk(
  "user/update-avatar",
  async (imgData, thunkAPI) => {
    try {
      const { data } = await updateAvatarApi(imgData);

      if (data.status) {
        toast.success("Avatar Updated");
      }

      return data;
    } catch (error) {
      console.error("Error updating avatar:", error);
    

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to update avatar"
      );
    }
  }
);



// change Password
export const changePassword = createAsyncThunk(
  "user/change-password",
  async (passwordData, thunkAPI) => {
    try {
      const { data } = await updateAvatarApi(passwordData);
      if (data.status) {
        toast.success("Password Changed Successfully");
      }
      return data;
    } catch (error) {
      console.error("Error changing password:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || " Failed to change password"
      );
    }
  }
);
// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  updateAvatarLoading :false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUserAvatar(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          avatar: {
            public_id: action.payload.public_id,
            url: action.payload.url,
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login as admin
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
            // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update profile details
      .addCase(updateProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        toast.success("Profile Updated Successfully");
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to Update Profile Details");
      })
      // update avatar
      .addCase(updateAvatar.pending, (state) => {
        state.updateAvatarLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.updateAvatarLoading = false;
        state.user = {
          ...state.user,
          avatar: {
            public_id: action.payload.public_id,
            url: action.payload.url,
          },
        };
        toast.success("Avatar Updated Successfully");
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.updateAvatarLoading = false;
        state.error = action.payload;
        toast.error("Failed to Update Avatar");
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Password Changed Successfully");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to Change Password");
      });
  },
});

export const { logout, clearError, clearUser , updateUserAvatar} = authSlice.actions;
export default authSlice.reducer;
