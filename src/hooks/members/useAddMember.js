import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMemberToChannel } from "../../api/members";
import { useChannelContext } from "../useChannelContext";

export const useAddMember = () => {
  const queryClient = useQueryClient();
  const { activeChannel } = useChannelContext();
  const mutation = useMutation({
    mutationFn: ({ userId }) => {
      return addMemberToChannel(activeChannel.id, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", activeChannel.id],
      });
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Failed to add member");
    },
  });

  return {
    addMember: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
