import axios from "axios";

const API = axios.create({
  baseURL: `${"http://localhost:4000"}/api/v1/admin/order`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});

export const getOrderByIDApi = (id) => API.get(`/${id}`);
export const getAllOrdersApi = () => API.get("/all");
export const updateOrderStatusApi = (id) => API.patch(`/update-status/${id}`);
export const deleteCancelledOrderApi = (id) => API.delete(`/delete/${id}`);
