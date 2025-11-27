import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { InputClass } from "../../styles";
import { Loader2, AlertCircle, X } from "lucide-react";

export default function AuthForm({ tab }) {
  const { submitAuth, isLoading, error, clearError } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitAuth(data, tab);
    } catch (err) {
      // Ошибка уже обработана в useAuth
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) trigger("confirmPassword");
  }, [password, confirmPassword, trigger]);

  // Очищаем ошибку при смене таба
  useEffect(() => {
    clearError();
  }, [tab, clearError]);

  const isRegister = tab === "register";
  const loading = isLoading || isSubmitting;

  return (
    <div className="space-y-4">
      {/* Глобальная ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter email"
            disabled={loading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат email",
              },
            })}
            className={`${InputClass} ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Nickname (только для регистрации) */}
        {isRegister && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your nickname"
              disabled={loading}
              {...register("nickname", {
                required: "Nickname is required",
                minLength: { value: 3, message: "Минимум 3 символа" },
              })}
              className={`${InputClass} ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
            {errors.nickname && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.nickname.message}
              </p>
            )}
          </div>
        )}

        {/* Password */}
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Your password"
            disabled={loading}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
            className={`${InputClass} ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password (только для регистрации) */}
        {isRegister && (
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Repeat password"
              disabled={loading}
              {...register("confirmPassword", {
                required: password ? "Repeat password" : false,
                validate: (value) =>
                  !value || value === password || "Пароли не совпадают",
              })}
              className={`${InputClass} ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full hover:bg-[#5865F2] bg-[#3B4288] transition duration-300 py-2.5 rounded-lg text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {loading ? "Загрузка..." : isRegister ? "Create account" : "Login"}
        </button>
      </form>
    </div>
  );
}
