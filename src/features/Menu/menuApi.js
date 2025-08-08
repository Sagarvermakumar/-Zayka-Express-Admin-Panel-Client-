import axios from "axios";
import BASE_URL from "../../config";

const API = axios.create({
  baseURL: `${BASE_URL}/api/v1/admin`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});

export const createMenuItemApi = (data) => API.post(`/menu-item/create`, data,{
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      withCredentials: true,
    });
export const getAllMenuItemsApi = (query) => API.get("/menu-item/all",{
    params: { query },
  });
export const editMenuItemApi = (id, data) => API.patch(`/menu-item/update/${id}`, data,{
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      withCredentials: true,
    });
export const deleteMenuItemApi = (id) => API.delete(`/menu-item/delete/${id}`);
export const getMenuItemByIdApi = (id) => API.get(`/menu-item/${id}`);
export const toggleMenuItemAvailabilityApi = (menuitemId) => 
  API.patch(`/menu-item/toggle/${menuitemId}`);
