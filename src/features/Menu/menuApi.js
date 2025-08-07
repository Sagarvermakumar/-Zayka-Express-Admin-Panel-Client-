import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:4000/api/v1/admin`, // Your actual API base URL
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
