import axios from "axios";

export const API = "https://grocerygo-ecom.onrender.com/";

export const api = axios.create({
  baseURL: API
});