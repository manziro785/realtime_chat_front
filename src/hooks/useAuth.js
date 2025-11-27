import { useMutation } from "@tanstack/react-query";
import { fetchLogin, fetchRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    useAuthStore.getState().setToken(data.token);
    setError(null);
    navigate("/dashboard");
  };

  const handleError = (error) => {
    const msg = error instanceof Error ? error.message : String(error);

    // Обработка разных типов ошибок
    if (msg.includes("401") || msg.includes("Unauthorized")) {
      setError("Неверный email или пароль");
    } else if (msg.includes("409") || msg.includes("already exists")) {
      setError("Пользователь с таким email уже существует");
    } else if (msg.includes("Network")) {
      setError("Ошибка сети. Проверьте подключение");
    } else {
      setError(msg || "Произошла ошибка. Попробуйте снова");
    }

    console.error("Auth error:", msg);
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
    setError(null); // Очищаем предыдущие ошибки

    if (type === "login") {
      return loginMutation.mutateAsync(data);
    } else {
      return registerMutation.mutateAsync(data);
    }
  };

  const clearError = () => setError(null);

  return {
    submitAuth,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error,
    clearError,
  };
};
