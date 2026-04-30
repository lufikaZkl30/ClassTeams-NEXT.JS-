'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { getTasks, initializeTasks, Task } from '../lib/tasks';

const ASSIGNMENT_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-lJYnUelwWohccO7XTqcxEx-JeSdF1mUJ0HwO5DpJNV_lPvQFF_7F4o5dBJr-ulgV6gtFmBSwESjD3R7_IypFIfOiPeIIEgK6fLXe81u2TNiUjkZgbWEBJPjxfSb41B4EWY3aUWgYPFFcmwMxt9M_fk71prVwZn1KocW3kt4pJBpmQJSxnfIEni41BSzSsfOqzVO1sXNG_Qxu-z5SvZijgzaO5vY6yAhFcZ-fW-_It0AyB8-PVvAOU0CDF3X2JIbia0di4ylxuNW2',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDrLDv4V9lGKsbxhGWzGjwJ8uvt_IR7qp8iz6t_66teUr3PXrVMHKKHEsH24SlkzgyW9OCAyeXHh1db3K1pE3az7tMfe2veMQsEuOxlBfKGewjfHA7XRj3CijvOGp1g2jT4aXz26ApXxsAw1klFKFoJiozoxyZztIJA-mqCJ0z-y3lul5-Xcjtva6iIEOaOIHbzZelhJh1Ow8ssKz8bsGUPr3WqJCnHkdUQh0w_1orEWU9pxFbarJT_Vzb-NVJkfC9XUlj3OX1eDlX1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuALFAWhO7SWwghJUteLVdpN8-XEeO6i1w6eE86bKpZnm7yEJJ5wnKxwPD5s_7tqYy3x_Bk7gSVDiBYl4TMqoFSXC2ccscL6wk6pKNIYxFSBWL3w-iPBYAYmBF16FGqTehzmJALzD4mDWF_-zwc7XFBFPyaxyrRJ3qLXMA-aOtK5PaCHVVE-JyrRRTPbPtew58vRd8OMzdCcgb4FOMi_5pAgaZw90GkaXPmXpB1DlTDSezgsNlgAq9PFaMV5B_aMcUQEMHUABAGC_JK9',
];

function getStatusBadge(status: string) {
  if (status === 'SUBMITTED') return <span className="bg-green-50 text-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">Submitted</span>;
  if (status === 'COMPLETED') return <span className="bg-green-50 text-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">Completed</span>;
  if (status === 'REVISED') return <span className="bg-orange-50 text-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">Revised</span>;
  return <span className="bg-red-50 text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">Pending</span>;
}

export default function AssignmentsPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeTasks();
    setTasks(getTasks());
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH ASSIGNMENTS..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold">Assignments</li>
              </ol>
            </nav>

            <header className="mb-16 flex flex-row items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Workspace Overview</span>
                <h1 className="text-5xl font-extrabold tracking-tighter text-on-background mt-2">ACTIVE ASSIGNMENTS</h1>
                <p className="text-on-surface-variant mt-4 text-base font-normal leading-relaxed">
                  Refining the craft through intentional practice. Manage your ongoing projects and track progress across the curriculum.
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <div className="bg-surface-container-high px-6 py-4 flex flex-col min-w-[140px]">
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Completed</span>
                  <span className="text-3xl font-extrabold text-primary">12/15</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Assignments List */}
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-on-background">Upcoming Submissions</h2>
                </div>

                {tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className="bg-surface p-6 border border-outline hover:border-primary transition-all cursor-pointer group relative"
                    onClick={() => router.push(`/assignments/detail?id=${task.id}`)}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 h-32 overflow-hidden bg-surface-container-low shrink-0 relative">
                        <img className="w-full h-full object-cover" alt="Assignment thumbnail" src={ASSIGNMENT_IMAGES[idx % ASSIGNMENT_IMAGES.length]} />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4 gap-2">
                          <div className="flex-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">{task.code}</span>
                            <h3 className="text-xl font-bold text-on-background mt-1">{task.title}</h3>
                            <p className="text-sm text-on-surface-variant mt-1">{task.course} • {task.code}</p>
                          </div>
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-6">
                          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span className="font-semibold">{task.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-base">person</span>
                            <span className="font-semibold">{task.instructor}</span>
                          </div>
                          <div className="flex-1"></div>
                          <button className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Open <span className="material-symbols-outlined text-sm">chevron_right</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-surface p-6 border border-outline">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Upcoming Deadlines</h3>
                  <div className="space-y-6">
                    {tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex gap-4">
                        <div className="w-12 h-12 bg-surface-container flex flex-col items-center justify-center shrink-0 shadow-sm text-sm">
                          <span className="font-bold text-primary text-xs">{task.deadline.split(' ')[1]?.replace(',', '')}</span>
                          <span className="text-[9px] uppercase font-mono text-on-surface-variant">{task.deadline.split(' ')[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-background">{task.title}</p>
                          <p className="text-xs text-on-surface-variant mt-1">{task.course}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface p-6 border border-outline">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Progress Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Total Assignments</span>
                      <span className="font-bold">{tasks.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Submitted</span>
                      <span className="font-bold text-green-600">{tasks.filter(t => t.status === 'SUBMITTED' || t.status === 'COMPLETED').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Pending</span>
                      <span className="font-bold text-primary">{tasks.filter(t => t.status === 'PENDING').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
