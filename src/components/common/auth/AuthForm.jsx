import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function AuthForm({ tab }) {
  const { submitAuth } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await submitAuth(data, tab);
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) trigger("confirmPassword");
  }, [password, confirmPassword, trigger]);

  const isRegister = tab === "register";
  const inputClass =
    "w-full px-3 py-2 border-2 border-[#363946] placeholder-[#6A7282] text-[var(--color-text)] bg-[#1A1D29] rounded-lg focus:ring-2 focus:ring-[#363946]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {isRegister && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Your nickname"
            {...register("nickname", { required: "Nickname is required" })}
            className={inputClass}
          />
          {errors.nickname && (
            <p className="text-red-600 text-sm">{errors.nickname.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <input
          type="password"
          placeholder="Your password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          className={inputClass}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      {isRegister && (
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Repeat password"
            {...register("confirmPassword", {
              required: password ? "Repeat password" : false,
              validate: (value) =>
                !value || value === password || "Passwords don't match",
            })}
            className={inputClass}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full hover:bg-[#5865F2] bg-[#3B4288] transition duration-300 py-2.5 rounded-lg text-white font-semibold"
      >
        {isRegister ? "Create account" : "Login"}
      </button>
    </form>
  );
}
