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
import type { Task } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 AUTH + LOAD DATA
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const { data, error: authError } = await supabase.auth.getUser();

        if (authError || !data.user) {
          router.replace("/auth/login");
          return;
        }

        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (tasksError) {
          setError(tasksError.message);
          setTasks([]);
        } else if (tasksData) {
          const mapped: Task[] = tasksData.map((t: any) => ({
            id: t.id, // ✅ Keep as string (Supabase UUID)
            code: t.code || "TASK",
            title: t.title || "-",
            deadline: t.deadline || "-",
            instructor: t.instructor || "Unknown",
            status: t.status || "PENDING",
            priority: t.priority || "NORMAL",
            course: t.course || "-",
            description: t.description || "",
          }));

          setTasks(mapped);
          setError(null);
        }
      } catch (err) {
        console.error("Error initializing dashboard:", err);
        setError("Failed to load dashboard");
      } finally {
        setMounted(true);
        setLoading(false);
      }
    };

    init();
  }, [router]);

  // ➕ CREATE
  const handleCreate = async (taskData: {
    title: string;
    description: string;
  }) => {
    try {
      const { error: insertError } = await supabase.from("tasks").insert({
        title: taskData.title,
        description: taskData.description,
        status: "PENDING",
        code: "TASK-" + Date.now(),
        deadline: new Date().toISOString(),
        instructor: "Unknown",
        priority: "NORMAL",
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      // Reload data tanpa refresh page
      const { data, error: fetchError } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else if (data) {
        const mapped: Task[] = data.map((t: any) => ({
          id: t.id, // ✅ Keep as string (Supabase UUID)
          code: t.code || "TASK",
          title: t.title || "-",
          deadline: t.deadline || "-",
          instructor: t.instructor || "Unknown",
          status: t.status || "PENDING",
          priority: t.priority || "NORMAL",
          course: t.course || "-",
          description: t.description || "",
        }));

        setTasks(mapped);
        setError(null);
      }
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete task?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (deleteError) {
        setError(deleteError.message);
        return;
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting task:", err);
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
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        setError(logoutError.message);
        return;
      }
      router.push("/auth/login");
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to logout");
    }
  };

  // 🔄 Render Loading State
  if (loading || !mounted) {
    return (
      <>
        <Header searchPlaceholder="SEARCH DASHBOARD..." />
        <main className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto text-center py-12">
            <div className="animate-spin inline-block">
              <span className="material-symbols-outlined text-4xl">
                hourglass_empty
              </span>
            </div>
            <p className="mt-4 text-gray-500">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
            {/* TASK */}
            <section className="col-span-8 flex flex-col gap-6">
              <NewPostBox onCreateTask={handleCreate} />

              {tasks.length === 0 ? (
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