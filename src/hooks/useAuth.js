import { useMutation } from "@tanstack/react-query";
import { fetchLogin, fetchRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const navigate = useNavigate();
  const handleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    useAuthStore.getState().setToken(data.token);

    navigate("/dashboard");
  };

  const handleError = (error) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(msg);
  };

  const loginMutation = useMutation({
    mutationFn: (params) => fetchLogin(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const registerMutation = useMutation({
    mutationFn: (params) => fetchRegister(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submitAuth = async (data, type) => {
    if (type === "login") {
      return loginMutation.mutateAsync(data);
    } else {
      return registerMutation.mutateAsync(data);
    }
  };

  return {
    submitAuth,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
