import { api } from "./axiosInstance";

export const getChannelMembers = async (idChannel) => {
  const res = await api.get(`/channels/${idChannel}/members`);
  return res.data;
};

export const deleteChannelMember = async (idChannel, memberId) => {
  const res = await api.delete(`/channels/${idChannel}/members/${memberId}`);
  return res.data;
};

export const addMemberToChannel = async (channelId, userId) => {
  const res = await api.post(`/channels/${channelId}/members`, {
    user_id: userId,
  });
  return res.data;
};
