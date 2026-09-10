import axios from "axios";

export const API = "https://grocerygo-ecom-eb51.onrender.com";

export const api = axios.create({
  baseURL: API
});