import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUpDefault = location.pathname === "/signup";
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignUp && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    try {
      setLoading(true);
      const endpoint = isSignUp
        ? "http://localhost:5000/api/v1/auth/signup"
        : "http://localhost:5000/api/v1/auth/login";

      const payload = isSignUp
        ? { name: name.trim(), email: email.trim(), password }
        : { email: email.trim(), password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Authentication failed");
      }

      setSuccess(data.message || (isSignUp ? "Account created!" : "Welcome back!"));
      if (data.user) {
        localStorage.setItem("questai_user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        navigate("/journey");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-md px-6 py-12 w-full flex-1 flex flex-col justify-center">
        <div className="leetcode-panel rounded-2xl p-8 border border-slate-200 bg-white shadow-xs">
          {/* Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 mb-3">
              <Sparkles size={13} />
              <span>QuestAI Platform</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>

            <p className="text-xs text-slate-500 font-medium mt-1">
              {isSignUp
                ? "Start practicing 100+ curated LeetCode DSA questions."
                : "Log in to continue your algorithmic practice missions."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError("");
                setSuccess("");
              }}
              className={`py-2 rounded-lg transition ${
                !isSignUp
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError("");
                setSuccess("");
              }}
              className={`py-2 rounded-lg transition ${
                isSignUp
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error / Success Feedback Alerts */}
          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-amber-400" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? "Create Account" : "Log In"}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle text */}
          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
            {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setSuccess("");
              }}
              className="font-bold text-amber-600 hover:underline ml-1"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
