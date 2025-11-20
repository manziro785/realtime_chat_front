import { api } from "./axiosInstance";

export const createChannel = async (userData) => {
  const res = await api.post("/channels", userData);
  return res.data;
};

export const getChannels = async () => {
  const res = await api.get("/channels");
  return res.data;
};

export const joinChannel = async (adminCode) => {
  const res = await api.post("/channels/join", { admin_code: adminCode });
  return res.data;
};

export const updateChannel = async (idChannel, channelData) => {
  const res = await api.patch(`/channels/${idChannel}`, channelData);
  return res.data;
};

export const deleteChannel = async (idChannel) => {
  const res = await api.delete(`/channels/${idChannel}`);
  return res.data;
};
