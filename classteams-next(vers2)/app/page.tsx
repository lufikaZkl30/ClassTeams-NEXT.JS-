'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { getTasks, initializeTasks, getStatusColor, getPriorityColor, Task } from './lib/tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeTasks();
    setTasks(getTasks());
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH DASHBOARD..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li><a href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</a></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold">Academic Ledger</li>
              </ol>
            </nav>

            <header className="mb-16">
              <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Academic Ledger</h2>
              <p className="text-sm font-mono text-primary tracking-widest uppercase">Structural Assignment Management // Fall 2024</p>
            </header>

            <div className="grid grid-cols-12 gap-8">
              <section className="col-span-8 flex flex-col gap-12" aria-label="Tasks list">
                {tasks.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Tidak ada tugas. Buat yang baru!</p>
                ) : (
                  tasks.map((task) => (
                    <article key={task.id} className="group">
                      <header className="flex items-start justify-between bg-surface-container-high p-6 mb-[1px]">
                        <hgroup>
                          <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">CODE: {task.code}</span>
                          <h3 className="text-2xl font-bold tracking-tight uppercase text-on-background">{task.title}</h3>
                        </hgroup>
                        <span className={`text-[10px] font-bold ${getStatusColor(task.status)} uppercase tracking-widest border px-2 py-1`}>
                          {task.status}
                        </span>
                      </header>
                      <footer className="bg-white p-6 flex justify-between items-end border-b border-outline border-opacity-20">
                        <dl className="flex gap-12">
                          <div>
                            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Deadline</dt>
                            <dd className="font-mono text-sm uppercase text-on-surface">{task.deadline}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Instruktur/Tipe</dt>
                            <dd className="font-mono text-sm uppercase text-on-surface">{task.instructor}</dd>
                          </div>
                          {task.priority && (
                            <div>
                              <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Prioritas</dt>
                              <dd className={`font-mono text-sm uppercase ${getPriorityColor(task.priority)}`}>{task.priority}</dd>
                            </div>
                          )}
                        </dl>
                        <Link
                          href={`/assignments/detail?id=${task.id}`}
                          className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                        >
                          Open Case
                        </Link>
                      </footer>
                    </article>
                  ))
                )}
              </section>

              <aside className="col-span-4 flex flex-col gap-8" aria-label="Dashboard summary">
                <section className="bg-tertiary p-8 text-on-tertiary">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-8 text-slate-400">Ledger Summary</h3>
                  <dl className="flex flex-col gap-4">
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">Open Tasks</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-primary-container">03</dd>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">Completed</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter">18</dd>
                    </div>
                    <div className="flex justify-between items-end">
                      <dt className="text-[10px] uppercase font-bold">Compliance Rate</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">92%</dd>
                    </div>
                  </dl>
                </section>

                <section className="bg-white p-8 border border-outline border-opacity-30">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">Recent Activity</h3>
                  <ul className="space-y-4">
                    <li className="border-l-2 border-primary pl-4">
                      <p className="text-[10px] font-bold uppercase text-on-surface">Submitted Calculus VII</p>
                      <time className="text-[10px] font-mono text-slate-500 uppercase">2 hours ago</time>
                    </li>
                    <li className="border-l-2 border-outline pl-4">
                      <p className="text-[10px] font-bold uppercase text-on-surface">Resource Added: Beam Strength PDF</p>
                      <time className="text-[10px] font-mono text-slate-500 uppercase">Yesterday</time>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
