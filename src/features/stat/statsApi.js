import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:4000/api/v1/admin`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});



export const getAllStatsApi = () => API.get("/stats/all");

export const getOrderStatsApi = () => API.get("/orders/stats");
