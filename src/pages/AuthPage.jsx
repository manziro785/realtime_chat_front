import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-72 h-72 bg-blue-400 rounded-full blur-3xl mix-blend-soft-light" />
        <div className="absolute bottom-16 right-16 w-96 h-96 bg-cyan-400 rounded-full blur-3xl mix-blend-soft-light" />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-gray-800 hover:bg-gray-800 absolute top-4 left-4 z-20 p-2 rounded-full hover:bg-blue-100 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-blue-500" />
      </button>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[var(--color-main)] backdrop-blur-lg shadow-2xl border border-none rounded-2xl flex flex-col gap-6 overflow-hidden">
          <h3 className="text-center -mb-5 text-3xl font-semibold mt-10">
            Welcome!
          </h3>
          <p className="text-center text-[#99A1AF]">Enter your information</p>
          <div className="px-8 py-6 :pb-8">
            <div className="grid w-full grid-cols-2 mb-6 rounded-lg overflow-hidden border border-[#3B4288] shadow-sm">
              <button
                className={`py-3 text-sm font-medium transition-all rounded-l-lg ${
                  tab === "login"
                    ? "bg-[#3B4288] text-[var(--color-text)] shadow-inner"
                    : "bg-transparent text-[#5865F2] hover:bg-blue-100"
                }`}
                onClick={() => setTab("login")}
              >
                Sign in
              </button>
              <button
                className={`py-3 text-sm font-medium transition-all rounded-r-lg ${
                  tab === "register"
                    ? "bg-[#3B4288] text-[var(--color-text)] shadow-inner"
                    : "bg-transparent text-[#5865F2] hover:bg-blue-100"
                }`}
                onClick={() => setTab("register")}
              >
                Sign up
              </button>
            </div>
            <AuthForm tab={tab} />
          </div>
        </div>
      </div>
    </div>
  );
};
