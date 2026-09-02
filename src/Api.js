import axios from "axios";

export const API = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API
});