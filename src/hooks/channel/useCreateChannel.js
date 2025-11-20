import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";
import { createChannel } from "../../api/channel";

export const useCreateChannel = () => {
  const handleSuccess = (data) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ["channels"] });
  };

  const channelMutation = useMutation({
    mutationFn: (params) => createChannel(params),
    onSuccess: handleSuccess,
  });

  return {
    createChannel: channelMutation.mutateAsync,
    isPending: channelMutation.isPending,
  };
};
