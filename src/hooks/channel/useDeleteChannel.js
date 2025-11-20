import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChannel } from "../../api/channel";
import { useChannelContext } from "./useChannelContext";

export const useDeleteChannel = () => {
  const queryClient = useQueryClient();
  const { setActiveChannel } = useChannelContext();

  const mutation = useMutation({
    mutationFn: ({ channelId }) => {
      return deleteChannel(channelId);
    },
    onSuccess: () => {
      setActiveChannel(null);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to delete channel");
    },
  });

  return {
    deleteChannel: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
