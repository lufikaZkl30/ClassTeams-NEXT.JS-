"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔐 cek kalau sudah login (Supabase session)
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.replace("/");
      }
    };

    checkUser();
  }, [router]);

  // 🔐 handle login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // ✅ login sukses
    router.replace("/");
  };

  return (
    <main className="flex min-h-screen w-full">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary to-primary-container items-center justify-center p-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaegl0g4ZoXGjDuj-Cv1FjXci0_tcA84j5-f48kTwo8x5SL1mK1dh-Gx7z1fVFVEtw3EYUViYtcqlqGYqdcmYbBXl9e9aXUPNnuZv_oht-VDwaZ_7woiVQqMfJydBP7qsXaQAZA-3FbbMPLLdi-aQftRnm8nfBwxkqMwboNhdUjz9CPQ3AByAROOA4iB9sObe4UkBbtG7IF3Ks1tN-2eCKH99L5wx_e4JrrJVEk7eou7edyhldF6-g2Ucy5uqXH_htpZ43oMSSwo1L"
            className="w-full h-full object-cover opacity-20"
            alt="bg"
          />
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <h1 className="text-5xl font-extrabold mb-4">ClassTeams</h1>
          <p className="text-xl opacity-80">Your Academic Ledger.</p>
          <p className="mt-6 text-lg opacity-90">
            Curate your assignments, track your progress, and manage your academic life.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-10">

          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-bold text-primary">ClassTeams</h1>
            <p className="text-sm text-on-surface-variant">Your Academic Ledger</p>
          </div>

          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Access your dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="text-sm block mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm block mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* REMEMBER */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Remember Me</span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-full"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* ALT LOGIN */}
            <button
              type="button"
              className="w-full py-3 border rounded-full flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined">school</span>
              Sign in with School Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-on-surface-variant">
            Need an account?{" "}
            <span className="text-primary font-semibold cursor-pointer">
              Request Access
            </span>
          </p>

        </div>
      </div>
    </main>
  );
}