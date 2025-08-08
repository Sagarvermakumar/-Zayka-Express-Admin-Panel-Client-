import axios from "axios";
import BASE_URL from "../../config";

const API = axios.create({
  baseURL: `${BASE_URL}/api/v1/admin`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});



export const getAllStatsApi = () => API.get("/stats/all");

export const getOrderStatsApi = () => API.get("/orders/stats");
