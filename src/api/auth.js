import { api } from "./axiosInstance";

export const fetchLogin = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

export const fetchRegister = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const getMeInfo = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
