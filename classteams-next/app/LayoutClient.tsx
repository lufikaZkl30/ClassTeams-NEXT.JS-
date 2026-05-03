"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setMounted(true);

    const isLogin = localStorage.getItem("isLogin");

    // ❌ Belum login → paksa ke login
    if (!isLogin && !isAuthPage) {
      router.replace("/auth/login");
    }

    // ❌ Sudah login → jangan ke halaman auth lagi
    if (isLogin && isAuthPage) {
      router.replace("/");
    }
  }, [pathname, router, isAuthPage]);

  // ⛔ Hindari render sebelum mounted (biar ga flicker / error hydration)
  if (!mounted) return null;

  return (
    <div
      className={`bg-background text-on-background min-h-screen ${
        isAuthPage ? "" : "flex"
      }`}
    >
      {/* Sidebar hanya muncul kalau bukan auth */}
      {!isAuthPage && <Sidebar />}

      {/* Main Content */}
      <div
        className={`flex-grow flex flex-col min-h-screen ${
          isAuthPage ? "items-center justify-center" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}