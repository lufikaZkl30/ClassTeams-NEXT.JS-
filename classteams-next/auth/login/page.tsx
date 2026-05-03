"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // ✅ kalau sudah login → langsung ke dashboard
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      router.push("/");
    }
  }, [router]);

  // ✅ handle login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 🔐 simulasi login
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("isLogin", "true");

      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      alert("Email atau password salah");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login ClassTeams
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Remember Me</span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Extra */}
          <p className="text-sm text-center">
            Belum punya akun?{" "}
            <Link href="#" className="text-primary font-semibold">
              Daftar
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}