import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChannel } from "../../api/channel";

export const useUpdateChannel = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ idChannel, channelData }) => {
      return updateChannel(idChannel, channelData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to update channel");
    },
  });

  return {
    updateChannel: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
