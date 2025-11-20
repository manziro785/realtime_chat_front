import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChannelMember } from "../../api/members";
import { useChannelContext } from "../channel/useChannelContext";

export const useDeleteChannelMember = () => {
  const queryClient = useQueryClient();
  const { activeChannel } = useChannelContext();
  const mutation = useMutation({
    mutationFn: ({ memberId }) => {
      return deleteChannelMember(activeChannel.id, memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", activeChannel.id],
      });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to delete member");
    },
  });

  return {
    deleteMember: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
