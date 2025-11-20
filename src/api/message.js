import { api } from "./axiosInstance";

export const getChannelMessages = async (channelId) => {
  const res = await api.get(`/channels/${channelId}/messages`);
  return res.data;
};
