import { api } from "./axiosInstance";

export const searchUsers = async (query) => {
  const res = await api.get("/users/search", {
    params: { query },
  });
  return res.data;
};

export const updateProfile = async ({ nickname, avatar_url }) => {
  const res = await api.patch("/users/me", { nickname, avatar_url });
  return res.data;
};
