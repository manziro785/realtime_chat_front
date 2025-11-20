import { api } from "./axiosInstance";

export const getMeInfo = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const editProfileInfo = async (userData) => {
  const res = await api.patch("/users/me", userData);
  return res.data;
};
