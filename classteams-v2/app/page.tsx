"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";
import TaskCard from "@/components/TaskCard";
import NewPostBox from "@/components/NewPostBox";
import { Task, DEFAULT_TASKS } from "@/lib/types";

const KEY = "classteams_tasks";

function load(): Task[] {
  if (typeof window === "undefined") return DEFAULT_TASKS;
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s) as Task[];
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS;
  } catch { return DEFAULT_TASKS; }
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTasks(load()); setReady(true); }, []);

  function save(t: Task[]) {
    setTasks(t);
    localStorage.setItem(KEY, JSON.stringify(t));
  }

  const open      = tasks.filter(t => t.status === "PENDING"   || t.status === "REVISED").length;
  const completed = tasks.filter(t => t.status === "COMPLETED" || t.status === "SUBMITTED").length;

  return (
    <>
      <TopBar placeholder="SEARCH DASHBOARD..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">

          <Breadcrumb crumbs={[{ label: "Dashboard", href: "/" }, { label: "Academic Ledger" }]} />

          {/* Page Header */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Academic Ledger
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Structural Assignment Management // Fall 2024
            </p>
          </header>

          {/* 12-column grid */}
          <div className="grid grid-cols-12 gap-8">

            {/* ── Tasks Column (8 cols) ── */}
            <section className="col-span-8 flex flex-col gap-6" aria-label="Tasks list">

              <NewPostBox onCreate={t => save([{ ...t, id: Date.now() }, ...tasks])} />

              {!ready ? (
                <p className="text-slate-400 text-center py-8 text-[10px] font-mono uppercase tracking-widest">
                  Loading...
                </p>
              ) : tasks.length === 0 ? (
                <div className="bg-white border border-dashed border-outline/40 p-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-200 block mb-4">inbox</span>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">
                    No tasks yet. Create a new entry above.
                  </p>
                </div>
              ) : (
                tasks.map(t => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onDelete={id => {
                      if (!confirm("Delete this task?")) return;
                      save(tasks.filter(x => x.id !== id));
                    }}
                  />
                ))
              )}
            </section>

            {/* ── Sidebar Stats (4 cols) ── */}
            <aside className="col-span-4 flex flex-col gap-8" aria-label="Dashboard summary">

              {/* Ledger Summary */}
              <section className="bg-tertiary p-8 text-on-tertiary">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-8 text-slate-400">
                  Ledger Summary
                </h3>
                <dl className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                    <dt className="text-[10px] uppercase font-bold">Open Tasks</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter text-primary-container">
                      {String(open).padStart(2, "0")}
                    </dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                    <dt className="text-[10px] uppercase font-bold">Completed</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter">{completed}</dd>
                  </div>
                  <div className="flex justify-between items-end">
                    <dt className="text-[10px] uppercase font-bold">Compliance Rate</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">92%</dd>
                  </div>
                </dl>
              </section>

              {/* Recent Activity */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">
                  Recent Activity
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-primary pl-4">
                    <p className="text-[10px] font-bold uppercase text-on-surface">
                      Submitted Calculus VII
                    </p>
                    <time className="text-[10px] font-mono text-slate-500 uppercase">2 hours ago</time>
                  </li>
                  <li className="border-l-2 border-outline pl-4">
                    <p className="text-[10px] font-bold uppercase text-on-surface">
                      Resource Added: Beam Strength PDF
                    </p>
                    <time className="text-[10px] font-mono text-slate-500 uppercase">Yesterday</time>
                  </li>
                </ul>
              </section>

            </aside>
          </div>
        </div>
      </main>

      <PageFooter />
    </>
  );
}
