import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client } from "@metahkg/api";
import Axios from "axios";

const axios = Axios.create();

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(async (response) => {
  if (response.headers.token)
    await AsyncStorage.setItem("token", response.headers.token);
  return response;
});

export const api = new Client("https://metahkg.org/api", axios);
