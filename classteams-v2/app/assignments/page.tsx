"use client";

import { useState } from "react";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";

/* ── Static assignment data (matches the original HTML) ── */
const ASSIGNMENTS = [
  {
    id: 1,
    code: "ARCH101",
    course: "Foundations of Architecture",
    instructor: "Dr. James Mitchell",
    title: "Spatial Dynamics in Urban Design",
    urgency: "Urgent Submission",
    urgencyColor: "text-error",
    deadline: "October 24, 2023",
    deadlineDate: "2023-10-24",
    timeLeft: "14h Remaining",
    timeColor: "text-error",
    progress: 75,
    status: "Pending",
    statusBg: "bg-red-50 text-red-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-lJYnUelwWohccO7XTqcxEx-JeSdF1mUJ0HwO5DpJNV_lPvQFF_7F4o5dBJr-ulgV6gtFmBSwESjD3R7_IypFIfOiPeIIEgK6fLXe81u2TNiUjkZgbWEBJPjxfSb41B4EWY3aUWgYPFFcmwMxt9M_fk71prVwZn1KocW3kt4pJBpmQJSxnfIEni41BSzSsfOqzVO1sXNG_Qxu-z5SvZijgzaO5vY6yAhFcZ-fW-_It0AyB8-PVvAOU0CDF3X2JIbia0di4ylxuNW2",
    submitted: false,
  },
  {
    id: 2,
    code: "DMS204",
    course: "Digital Media Studio",
    instructor: "Prof. Sarah Chen",
    title: "Interactivity & Visual Hierarchy",
    urgency: "Awaiting Review",
    urgencyColor: "text-secondary",
    deadline: "Oct 20",
    deadlineDate: "2023-10-20",
    timeLeft: null,
    timeColor: "",
    progress: null,
    status: "Submitted",
    statusBg: "bg-green-50 text-green-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrLDv4V9lGKsbxhGWzGjwJ8uvt_IR7qp8iz6t_66teUr3PXrVMHKKHEsH24SlkzgyW9OCAyeXHh1db3K1pE3az7tMfe2veMQsEuOxlBfKGewjfHA7XRj3CijvOGp1g2jT4aXz26ApXxsAw1klFKFoJiozoxyZztIJA-mqCJ0z-y3lul5-Xcjtva6iIEOaOIHbzZelhJh1Ow8ssKz8bsGUPr3WqJCnHkdUQh0w_1orEWU9pxFbarJT_Vzb-NVJkfC9XUlj3OX1eDlX1",
    submitted: true,
  },
  {
    id: 3,
    code: "VIS102",
    course: "Visual Communications",
    instructor: "Dr. Michael Ross",
    title: "Typography & Typeface History",
    urgency: "Standard Task",
    urgencyColor: "text-on-surface-variant",
    deadline: "November 02, 2023",
    deadlineDate: "2023-11-02",
    timeLeft: "9 Days Remaining",
    timeColor: "",
    progress: 10,
    status: "Pending",
    statusBg: "bg-orange-50 text-orange-700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALFAWhO7SWwghJUteLVdpN8-XEeO6i1w6eE86bKpZnm7yEJJ5wnKxwPD5s_7tqYy3x_Bk7gSVDiBYl4TMqoFSXC2ccscL6wk6pKNIYxFSBWL3w-iPBYAYmBF16FGqTehzmJALzD4mDWF_-zwc7XFBFPyaxyrRJ3qLXMA-aOtK5PaCHVVE-JyrRRTPbPtew58vRd8OMzdCcgb4FOMi_5pAgaZw90GkaXPmXpB1DlTDSezgsNlgAq9PFaMV5B_aMcUQEMHUABAGC_JK9",
    submitted: false,
  },
];

const CATEGORIES = [
  { code: "ARCH101", instructor: "Dr. James Mitchell",  course: "Foundations of Architecture" },
  { code: "DMS204",  instructor: "Prof. Sarah Chen",    course: "Digital Media Studio" },
  { code: "VIS102",  instructor: "Dr. Michael Ross",    course: "Visual Communications" },
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const visible = filter ? ASSIGNMENTS.filter(a => a.code === filter) : ASSIGNMENTS;

  return (
    <>
      <TopBar placeholder="SEARCH ASSIGNMENTS..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">

          <Breadcrumb crumbs={[{ label: "Dashboard", href: "/" }, { label: "Assignments" }]} />

          {/* Hero Header */}
          <header className="mb-16 flex flex-row items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                Workspace Overview
              </span>
              <h1 className="text-5xl font-extrabold tracking-tighter text-on-background mt-2">
                ACTIVE ASSIGNMENTS
              </h1>
              <p className="text-on-surface-variant mt-4 text-base leading-relaxed">
                Refining the craft through intentional practice. Manage your ongoing projects
                and track progress across the curriculum.
              </p>
            </div>
            <div className="flex-shrink-0 bg-surface-container-high px-6 py-4 flex flex-col min-w-[140px]">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Completed</span>
              <span className="text-3xl font-extrabold text-primary">12/15</span>
            </div>
          </header>

          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-on-background mb-6">Filter by Course &amp; Instructor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {CATEGORIES.map(c => (
                <button
                  key={c.code}
                  onClick={() => setFilter(filter === c.code ? null : c.code)}
                  className={`p-4 border text-left transition-all hover:border-primary group ${
                    filter === c.code
                      ? "border-primary bg-primary-container"
                      : "bg-surface border-outline"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Instructor</p>
                      <p className="text-sm font-bold text-on-background mb-3">{c.instructor}</p>
                      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Course</p>
                      <p className="text-sm font-semibold text-primary">{c.course}</p>
                      <p className="text-xs text-on-surface-variant mt-1">{c.code}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">
                      arrow_forward
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {filter && (
              <button
                onClick={() => setFilter(null)}
                className="px-6 py-2 bg-surface-container border border-outline hover:bg-surface-container-high transition-colors text-sm font-semibold"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Assignments List (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-on-background">Upcoming Submissions</h2>
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Grid view">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">grid_view</span>
                  </button>
                  <button className="p-2 text-primary bg-primary-container" aria-label="List view">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">list</span>
                  </button>
                </div>
              </div>

              {visible.map(a => (
                <div key={a.id}
                  className="bg-surface p-6 border border-outline hover:border-primary transition-all cursor-pointer group relative"
                  role="button" tabIndex={0}
                  aria-label={`Open ${a.title}`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className={`w-full md:w-32 h-32 shrink-0 relative overflow-hidden bg-surface-container-low ${a.submitted ? "opacity-80" : ""}`}>
                      <Image src={a.image} alt={a.title} fill className="object-cover" />
                      {!a.submitted && (
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <div className="flex-1">
                          <span className={`text-xs font-bold uppercase tracking-wider ${a.urgencyColor}`}>
                            {a.urgency}
                          </span>
                          <h3 className="text-xl font-bold text-on-background mt-1">{a.title}</h3>
                          <p className="text-sm text-on-surface-variant mt-1">{a.course} • {a.code}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${a.statusBg}`}>
                          {a.status}
                        </span>
                      </div>

                      {/* Row actions */}
                      <div className="mt-6 flex flex-wrap items-center gap-6">
                        {a.submitted ? (
                          <>
                            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
                              <span className="font-semibold">Submitted {a.deadline}</span>
                            </div>
                            <div className="flex-1" />
                            <button
                              className="bg-surface-container text-on-surface-variant font-bold text-xs px-4 py-2 border border-outline/20 hover:bg-surface-container-high transition-colors"
                              onClick={e => { e.stopPropagation(); alert(`Receipt for: ${a.title}\nCourse: ${a.code}\nStatus: ${a.status}`); }}
                            >
                              View Receipt
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                              <span className="material-symbols-outlined text-base" aria-hidden="true">calendar_today</span>
                              <span className="font-semibold">{a.deadline}</span>
                            </div>
                            {a.timeLeft && (
                              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                                <span className="material-symbols-outlined text-base" aria-hidden="true">schedule</span>
                                <span className={`font-semibold ${a.timeColor}`}>{a.timeLeft}</span>
                              </div>
                            )}
                            {a.progress !== null && (
                              <div className="flex-1 min-w-[120px]">
                                <div className="h-1.5 w-full bg-surface-container-high overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-primary to-primary-container" style={{ width: `${a.progress}%` }} />
                                </div>
                              </div>
                            )}
                            <button className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform whitespace-nowrap">
                              Open <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">

              {/* Upcoming Deadlines */}
              <div className="bg-surface p-6 border border-outline">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                  Upcoming Deadlines
                </h3>
                <div className="space-y-6">
                  {[
                    { month: "OCT", day: "24", title: "Spatial Dynamics Paper",   sub: "11:59 PM Submission", urgent: true },
                    { month: "OCT", day: "28", title: "Peer Review: Session 04",  sub: "In-class Collaboration", urgent: false },
                    { month: "NOV", day: "02", title: "Typography Final Case",     sub: "Portfolio Milestone", urgent: false, dim: true },
                  ].map((item, i) => (
                    <div key={i} className={`flex gap-4 ${item.dim ? "opacity-60" : ""}`}>
                      <div className="w-12 h-12 bg-surface-container flex flex-col items-center justify-center shrink-0 text-sm">
                        <span className="font-bold text-on-surface-variant">{item.month}</span>
                        <span className={`font-bold ${item.urgent ? "text-primary" : "text-on-background"}`}>{item.day}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-background leading-tight">{item.title}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 text-primary border border-primary/20 text-xs font-bold hover:bg-primary-container transition-colors">
                  View Full Schedule
                </button>
              </div>

              {/* Faculty Feedback */}
              <div className="bg-tertiary text-on-tertiary p-6 overflow-hidden relative">
                <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 pointer-events-none" aria-hidden="true">
                  <span className="material-symbols-outlined text-9xl">forum</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 relative z-10">Faculty Feedback</h3>
                <p className="text-sm leading-relaxed relative z-10 italic">
                  &ldquo;Excellent use of white space in your last module. Focus on the grid consistency for the next submission.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Dr. Elena Vos</p>
                    <p className="text-xs opacity-80 uppercase tracking-tighter">Design Theory Lead</p>
                  </div>
                </div>
              </div>

              {/* Semester Progress */}
              <div className="bg-surface p-6 border border-outline">
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  Semester Progress
                </h3>
                <div className="relative h-32 flex items-center justify-center mb-4">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96"
                    aria-label="80% course completion" role="img">
                    <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor"
                      strokeWidth="8" className="text-surface-container-high" />
                    <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor"
                      strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="50"
                      className="text-primary" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-extrabold text-on-background">80%</span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase">Course</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-on-background">3.82</p>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Current GPA</p>
                  </div>
                  <div className="text-center border-l border-outline/20">
                    <p className="text-lg font-bold text-on-background">42</p>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Credits</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </>
  );
}
