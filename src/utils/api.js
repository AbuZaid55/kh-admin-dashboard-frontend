import axios from "axios";

const VITE_API_BASE_UR = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

const api = axios.create({
  baseURL: VITE_API_BASE_UR, 
});

export default api;