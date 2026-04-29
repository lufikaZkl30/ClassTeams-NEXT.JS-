"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PostCard from "@/components/PostCard";
import NewPostBox from "@/components/NewPostBox";
import RightSidebar from "@/components/RightSidebar";
import { Task, DEFAULT_TASKS } from "@/lib/types";

const STORAGE_KEY = "classteams_tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return DEFAULT_TASKS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Task[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
}

function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setMounted(true);
  }, []);

  function handleCreate(taskData: Omit<Task, "id">) {
    const newTask: Task = { ...taskData, id: Date.now() };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);
  }

  function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  }

  const openTasks = tasks.filter(
    (t) => t.status === "PENDING" || t.status === "REVISED"
  ).length;
  const completedTasks = tasks.filter(
    (t) => t.status === "COMPLETED" || t.status === "SUBMITTED"
  ).length;

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

          {/* Page Header */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Academic Ledger
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Structural Assignment Management // Fall 2026
            </p>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Tasks Column */}
            <section
              className="col-span-8 flex flex-col gap-6"
              aria-label="Tasks list"
            >
              <NewPostBox onCreateTask={handleCreate} />

              {!mounted ? (
                <div className="text-slate-500 text-center py-8 text-sm font-mono uppercase tracking-widest">
                  Loading...
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed border-outline/40 p-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block" aria-hidden="true">
                    inbox
                  </span>
                  <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                    No tasks. Create a new entry above.
                  </p>
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
            </section>

            {/* Right Sidebar Stats */}
            <RightSidebar
              openTasks={openTasks}
              completedTasks={completedTasks}
              complianceRate={92}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
