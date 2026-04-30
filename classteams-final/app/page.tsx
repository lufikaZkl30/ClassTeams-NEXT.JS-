'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import "./globals.css";
import "@/public/navbar.css";
import {
  getTasks,
  initializeTasks,
  createTask,
  deleteTask,
  getStatusColor,
  getPriorityColor,
  Task,
} from './lib/tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    code: '',
    title: '',
    deadline: '',
    instructor: '',
    status: 'PENDING' as Task['status'],
    priority: 'NORMAL' as NonNullable<Task['priority']>,
    course: '',
    description: '',
  });

  function reload() {
    setTasks(getTasks());
  }

  // Initialize tasks on component mount
  useEffect(() => {
    initializeTasks();
    reload();
  }, []);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createTask({ ...form, attachments: [] });
    reload();
    setShowModal(false);
    setForm({ code: '', title: '', deadline: '', instructor: '', status: 'PENDING', priority: 'NORMAL', course: '', description: '' });
  }

  function handleDelete(id: number) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      deleteTask(id);
      reload();
    }
  }

  const openCount = tasks.filter(t => t.status === 'PENDING').length;
  const completedCount = tasks.filter(t => t.status === 'COMPLETED' || t.status === 'SUBMITTED').length;
  const compliance = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH DASHBOARD..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-primary hover:text-blue-700 font-semibold transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li className="text-on-surface-variant">/</li>
              <li className="text-on-surface-variant font-semibold">
                Academic Ledger
              </li>
            </ol>
          </nav>

            {/* Page Header */}
            <header className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Academic Ledger</h2>
                <p className="text-sm font-mono text-primary tracking-widest uppercase">Structural Assignment Management // Fall 2024</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-on-primary px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                New Task
              </button>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">

              {/* Tasks Column */}
              <section className="col-span-8 flex flex-col gap-12" aria-label="Tasks list">
                {tasks.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-outline">
                    <span className="material-symbols-outlined text-4xl text-slate-300 block mb-4">assignment</span>
                    <p className="text-slate-400 text-sm uppercase font-mono tracking-wider">Tidak ada tugas. Klik &quot;New Task&quot; untuk membuat.</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <article key={task.id} className="group animate-fade-in">
                      <header className="flex items-start justify-between bg-surface-container-high p-6 mb-[1px]">
                        <hgroup>
                          <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">CODE: {task.code}</span>
                          <h3 className="text-2xl font-bold tracking-tight uppercase text-on-background">{task.title}</h3>
                        </hgroup>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold ${getStatusColor(task.status)} uppercase tracking-widest border px-2 py-1`}>
                            {task.status}
                          </span>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="text-slate-400 hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Delete task"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </header>
                      <footer className="bg-white p-6 flex justify-between items-end border-b border-outline border-opacity-20">
                        <dl className="flex gap-12 flex-wrap">
                          <div>
                            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Deadline</dt>
                            <dd className="font-mono text-sm uppercase text-on-surface">{task.deadline}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Instruktur</dt>
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
                          className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                          Open Case
                        </Link>
                      </footer>
                    </article>
                  ))
                )}
              </section>

              {/* Sidebar Stats */}
              <aside className="col-span-4 flex flex-col gap-8" aria-label="Dashboard summary">
                <section className="bg-tertiary p-8 text-on-tertiary">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-8 text-slate-400">Ledger Summary</h3>
                  <dl className="flex flex-col gap-4">
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">Open Tasks</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-primary-container">{String(openCount).padStart(2, '0')}</dd>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">Completed</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter">{completedCount}</dd>
                    </div>
                    <div className="flex justify-between items-end">
                      <dt className="text-[10px] uppercase font-bold">Compliance Rate</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">{compliance}%</dd>
                    </div>
                  </dl>
                </section>

                <section className="bg-white p-8 border border-outline border-opacity-30">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">Recent Activity</h3>
                  <ul className="space-y-4">
                    {tasks.slice(0, 3).map((task) => (
                      <li key={task.id} className="border-l-2 border-primary pl-4">
                        <p className="text-[10px] font-bold uppercase text-on-surface truncate">{task.title}</p>
                        <time className="text-[10px] font-mono text-slate-500 uppercase">{task.status} • {task.deadline}</time>
                      </li>
                    ))}
                    {tasks.length === 0 && (
                      <li className="text-[10px] text-slate-400 font-mono uppercase">No activity yet</li>
                    )}
                  </ul>
                </section>

                {/* Quick Nav */}
                <section className="bg-white p-8 border border-outline border-opacity-30">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">Quick Access</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { href: '/assignments', icon: 'assignment', label: 'Assignments' },
                      { href: '/schedule', icon: 'calendar_today', label: 'Schedule' },
                      { href: '/resources', icon: 'folder', label: 'Resources' },
                      { href: '/settings', icon: 'settings', label: 'Settings' },
                    ].map(item => (
                      <Link key={item.href} href={item.href}
                        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-surface-container p-2 transition-colors">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Create Task Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white w-full max-w-2xl my-8 mx-4">
            <header className="flex items-center justify-between px-8 py-4 border-b border-outline">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary">Academic Ledger</p>
                <h2 className="text-2xl font-extrabold tracking-tighter">Create New Task</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <form onSubmit={handleCreate} className="p-8 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Course Code *</label>
                  <input required value={form.code} onChange={e => setForm({...form, code: e.target.value})}
                    placeholder="ARCH101"
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Course Name *</label>
                  <input required value={form.course} onChange={e => setForm({...form, course: e.target.value})}
                    placeholder="Foundations of Architecture"
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Task Title *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="Spatial Dynamics in Urban Design"
                  className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={3} placeholder="Task description..."
                  className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Instructor *</label>
                  <input required value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})}
                    placeholder="Dr. James Mitchell"
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Deadline *</label>
                  <input required value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})}
                    placeholder="OCT 24, 2024"
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Task['status']})}
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low">
                    <option value="PENDING">PENDING</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="REVISED">REVISED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">Priority</label>
                  <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as NonNullable<Task['priority']>})}
                    className="w-full border border-outline p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low">
                    <option value="NORMAL">NORMAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-outline text-on-surface-variant py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
