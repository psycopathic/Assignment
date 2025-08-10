import axios from "axios";

const BASE_URL =  "https://assignment-1-0omm.onrender.com/user";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
