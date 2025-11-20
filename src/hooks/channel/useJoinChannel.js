import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinChannel } from "../../api/channel";

export const useJoinChannel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (adminCode) => joinChannel(adminCode),
    onSuccess: (data) => {
      console.log("Successfully joined channel:", data);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError: (error) => {
      console.error("Failed to join channel:", error);
      alert(error.response?.data?.message || "Failed to join channel");
    },
  });

  return {
    joinChannel: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
