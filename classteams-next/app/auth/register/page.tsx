"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const fullName = form.get("fullName") as string;
    const email = form.get("email") as string;
    const studentId = form.get("studentId") as string;
    const password = form.get("password") as string;

    // 🔐 REGISTER KE SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // 🧠 SIMPAN DATA TAMBAHAN KE TABLE profiles
    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          student_id: studentId,
        },
      ]);
    }

    alert("Cek email kamu untuk verifikasi!");

    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-[#f7f9fb] text-[#191c1e] antialiased selection:bg-[#dbe1ff] selection:text-[#00174b]">

      {/* LEFT PANEL (TIDAK DIUBAH) */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-[#00174b] relative overflow-hidden flex-col justify-between p-12 lg:p-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#004ac6]/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[#495c95]/10 blur-[150px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-3xl">auto_stories</span>
            <span className="font-extrabold text-2xl tracking-tight">ClassTeams</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <h1 className="text-5xl font-light text-white mb-8">
            Your Academic <br />
            <span className="font-semibold text-[#dbe1ff]">Ledger.</span>
          </h1>
          <p className="text-[#b4c5ff] text-lg">
            Curate your semester, anticipate deadlines, and master your schedule.
          </p>
        </div>

        <div className="relative z-10 text-xs text-[#b4c5ff]/60 uppercase">
          © 2026 ClassTeams
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-7/12 lg:w-1/2 bg-white flex items-center justify-center p-6 sm:p-12 lg:p-24">
        <div className="w-full max-w-[440px]">

          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">
              Create your account
            </h2>
            <p className="text-[#434655]">
              Setup takes less than a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              name="fullName"
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-[#e6e8ea] rounded-lg"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#e6e8ea] rounded-lg"
            />

            <input
              name="studentId"
              type="text"
              required
              placeholder="Student ID"
              className="w-full px-4 py-3 bg-[#e6e8ea] rounded-lg"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#e6e8ea] rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                👁
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-full"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm">
            Already have an account?
            <a href="/auth/login" className="text-blue-600 ml-1">
              Sign In
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}