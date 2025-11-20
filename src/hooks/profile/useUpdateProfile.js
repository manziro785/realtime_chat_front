import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileInfo } from "../../api/profile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => editProfileInfo(data),
    onSuccess: (data) => {
      console.log("Profile updated:", data);
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  return {
    updateProfile: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
