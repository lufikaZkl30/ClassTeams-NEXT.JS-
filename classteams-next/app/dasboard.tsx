"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PostCard from "@/components/PostCard";
import NewPostBox from "@/components/NewPostBox";
import RightSidebar from "@/components/RightSidebar";
import { Task } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 AUTH + LOAD DATA (NO FLICKER)
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        // ✅ Middleware sudah handle auth check, jadi langsung load data
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (tasksError) {
          if (isMounted) {
            setError(tasksError.message);
            setTasks([]);
          }
          return;
        }

        // ✅ Mapping dengan string ID (sesuai Supabase UUID)
        const mapped: Task[] =
          tasksData?.map((t: any) => ({
            id: t.id, // Keep as string (UUID)
            code: t.code ?? "TASK",
            title: t.title ?? "-",
            deadline: t.deadline ?? "-",
            instructor: t.instructor ?? "Unknown",
            status: t.status ?? "PENDING",
            priority: t.priority ?? "NORMAL",
            course: t.course ?? "-",
            description: t.description ?? "",
          })) || [];

        if (isMounted) {
          setTasks(mapped);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to load dashboard");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // ➕ CREATE
  const handleCreate = async (taskData: {
    title: string;
    description: string;
  }) => {
    try {
      const { error } = await supabase.from("tasks").insert({
        title: taskData.title,
        description: taskData.description,
        status: "PENDING",
        code: "TASK-" + Date.now(),
        deadline: new Date().toISOString(),
        instructor: "Unknown",
        priority: "NORMAL",
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Reload data (tanpa flicker)
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      const mapped: Task[] =
        data?.map((t: any) => ({
          id: t.id, // Keep as string
          code: t.code ?? "TASK",
          title: t.title ?? "-",
          deadline: t.deadline ?? "-",
          instructor: t.instructor ?? "Unknown",
          status: t.status ?? "PENDING",
          priority: t.priority ?? "NORMAL",
          course: t.course ?? "-",
          description: t.description ?? "",
        })) || [];

      setTasks(mapped);
      setError(null);
    } catch {
      setError("Failed to create task");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete task?")) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) {
        setError(error.message);
        return;
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch {
      setError("Failed to delete task");
    }
  };

  // 📊 STATS
  const openTasks = tasks.filter(
    (t) => t.status === "PENDING" || t.status === "REVISED"
  ).length;

  const completedTasks = tasks.filter(
    (t) => t.status === "COMPLETED" || t.status === "SUBMITTED"
  ).length;

  const complianceRate =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  // 🔓 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <Header searchPlaceholder="SEARCH DASHBOARD..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Academic Ledger" },
            ]}
          />

          {/* HEADER */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Academic Ledger
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Connected to Supabase 🚀
            </p>
          </header>

          {/* ERROR ALERT */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-600 text-xs mt-2 underline hover:no-underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-12 gap-8">
            {/* TASK SECTION */}
            <section className="col-span-8 flex flex-col gap-6">
              <NewPostBox onCreateTask={handleCreate} />

              {/* LOADING STATE - Skeleton */}
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-white rounded-xl overflow-hidden border border-outline/20"
                    >
                      <div className="bg-surface-container-high p-6 mb-[1px]">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="bg-white p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed p-12 text-center rounded-xl">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">
                    inbox
                  </span>
                  <p className="text-gray-500 text-sm">No tasks yet</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <PostCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </section>

            {/* SIDEBAR */}
            <RightSidebar
              openTasks={openTasks}
              completedTasks={completedTasks}
              complianceRate={complianceRate}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}