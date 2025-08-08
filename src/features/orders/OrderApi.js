import axios from "axios";
import BASE_URL from "../../config";

const API = axios.create({
  baseURL: `${BASE_URL}/api/v1/admin/order`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});

export const getOrderByIDApi = (id) => API.get(`/${id}`);
export const getAllOrdersApi = (selectDate) => API.get("/all",{
    params: { date:selectDate },
  });
export const updateOrderStatusApi = (id,status) => API.patch(`/update-status/${id}?status=${status}`);
export const deleteCancelledOrderApi = (id) => API.delete(`/delete/${id}`);
