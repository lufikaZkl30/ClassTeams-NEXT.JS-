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

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 🔐 AUTH + LOAD DATA
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/auth/login");
        return;
      }

      setUser(data.user);

      // 🔥 ambil tasks dari database
      const { data: tasksData, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && tasksData) {
        setTasks(tasksData);
      }

      setMounted(true);
    };

    init();
  }, [router]);

  // ➕ CREATE TASK
  const handleCreate = async (taskData: any) => {
    const { error } = await supabase.from("tasks").insert({
      title: taskData.title,
      description: taskData.description,
      status: "PENDING",
    });

    if (!error) {
      // reload tasks
      const { data } = await supabase.from("tasks").select("*");
      setTasks(data || []);
    }
  };

  // ❌ DELETE TASK
  const handleDelete = async (id: string) => {
    if (!confirm("Delete task?")) return;

    await supabase.from("tasks").delete().eq("id", id);

    setTasks(tasks.filter((t) => t.id !== id));
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

          {/* GRID */}
          <div className="grid grid-cols-12 gap-8">

            {/* TASK */}
            <section className="col-span-8 flex flex-col gap-6">

              <NewPostBox onCreateTask={handleCreate} />

              {!mounted ? (
                <div className="text-center py-8 text-sm">
                  Loading...
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed p-12 text-center rounded-xl">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">
                    inbox
                  </span>
                  <p className="text-gray-500 text-sm">
                    No tasks yet
                  </p>
                </div>
              ) : (
                tasks.map((task: Task) => (
                  <PostCard
                    key={task.id}
                    task={task}
                    onDelete={(id) => handleDelete(id)} // ✅ FIX aman
                  />
                ))
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full"
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