import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:4000/api/v1/admin`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});

// get all users
export const getAllUsersApi = (query = '') =>
  API.get(`/user/all`, {
    params: { query },
  });

// get user by ID
export const getUserByIdApi = (id) => API.get(`/user/${id}`);

// block user
export const blockUserApi = (id) => API.patch(`/user/${id}/block`);

// unblock user
export const unblockUserApi = (id) => API.patch(`/user/${id}/unblock`); 

// update user role
export const updateUserRoleApi = (id, data) => API.patch(`/user/${id}/role`, data); 

// get all customers
export const getAllCustomersApi = () => API.get("/user/customers");

// delete user profile
export const deleteUserProfileApi = (id) => API.delete(`/user/${id}/delete-profile`);
