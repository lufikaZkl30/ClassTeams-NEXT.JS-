"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import AssignmentCard, {
  Assignment,
} from "@/components/AssignmentCard";

const ASSIGNMENTS_DATA: Assignment[] = [
  {
    id: 1,
    title: "Spatial Dynamics in Urban Design",
    code: "ARCH101",
    course: "Foundations of Architecture",
    instructor: "Dr. James Mitchell",
    deadline: "October 24, 2023",
    deadlineDate: "2023-10-24",
    status: "Pending",
    urgency: "Urgent Submission",
    timeRemaining: "14h Remaining",
    progress: 75,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-lJYnUelwWohccO7XTqcxEx-JeSdF1mUJ0HwO5DpJNV_lPvQFF_7F4o5dBJr-ulgV6gtFmBSwESjD3R7_IypFIfOiPeIIEgK6fLXe81u2TNiUjkZgbWEBJPjxfSb41B4EWY3aUWgYPFFcmwMxt9M_fk71prVwZn1KocW3kt4pJBpmQJSxnfIEni41BSzSsfOqzVO1sXNG_Qxu-z5SvZijgzaO5vY6yAhFcZ-fW-_It0AyB8-PVvAOU0CDF3X2JIbia0di4ylxuNW2",
    imageAlt:
      "Architectural sketch on drafting paper with wooden ruler and mechanical pencil",
  },
  {
    id: 2,
    title: "Interactivity & Visual Hierarchy",
    code: "DMS204",
    course: "Digital Media Studio",
    instructor: "Prof. Sarah Chen",
    deadline: "Oct 20",
    deadlineDate: "2023-10-20",
    status: "Submitted",
    urgency: "Awaiting Review",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrLDv4V9lGKsbxhGWzGjwJ8uvt_IR7qp8iz6t_66teUr3PXrVMHKKHEsH24SlkzgyW9OCAyeXHh1db3K1pE3az7tMfe2veMQsEuOxlBfKGewjfHA7XRj3CijvOGp1g2jT4aXz26ApXxsAw1klFKFoJiozoxyZztIJA-mqCJ0z-y3lul5-Xcjtva6iIEOaOIHbzZelhJh1Ow8ssKz8bsGUPr3WqJCnHkdUQh0w_1orEWU9pxFbarJT_Vzb-NVJkfC9XUlj3OX1eDlX1",
    imageAlt:
      "Digital UI design components layout on a high resolution screen",
  },
  {
    id: 3,
    title: "Typography & Typeface History",
    code: "VIS102",
    course: "Visual Communications",
    instructor: "Dr. Michael Ross",
    deadline: "November 02, 2023",
    deadlineDate: "2023-11-02",
    status: "Pending",
    urgency: "Standard Task",
    timeRemaining: "9 Days Remaining",
    progress: 10,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALFAWhO7SWwghJUteLVdpN8-XEeO6i1w6eE86bKpZnm7yEJJ5wnKxwPD5s_7tqYy3x_Bk7gSVDiBYl4TMqoFSXC2ccscL6wk6pKNIYxFSBWL3w-iPBYAYmBF16FGqTehzmJALzD4mDWF_-zwc7XFBFPyaxyrRJ3qLXMA-aOtK5PaCHVVE-JyrRRTPbPtew58vRd8OMzdCcgb4FOMi_5pAgaZw90GkaXPmXpB1DlTDSezgsNlgAq9PFaMV5B_aMcUQEMHUABAGC_JK9",
    imageAlt: "Clean desk with open notebook and graphite pencils",
  },
];

export default function AssignmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const uniqueCategories = Array.from(
    new Map(
      ASSIGNMENTS_DATA.map((a) => [
        a.code,
        { instructor: a.instructor, course: a.course, code: a.code },
      ])
    ).values()
  );

  const filteredAssignments = selectedCategory
    ? ASSIGNMENTS_DATA.filter((a) => a.code === selectedCategory)
    : ASSIGNMENTS_DATA;

  function handleOpenAssignment(id: number) {
    console.log("Opening assignment:", id);
    // In a real app: router.push(`/assignments/${id}`)
  }

  function handleViewReceipt(id: number) {
    const assignment = ASSIGNMENTS_DATA.find((a) => a.id === id);
    if (assignment) {
      alert(
        `Receipt for: ${assignment.title}\nCourse: ${assignment.code}\nStatus: ${assignment.status}`
      );
    }
  }

  return (
    <>
      <Header searchPlaceholder="SEARCH ASSIGNMENTS..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Assignments" },
            ]}
          />

          {/* Hero Header */}
          <header className="mb-16 flex flex-row items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                Workspace Overview
              </span>
              <h1 className="text-5xl font-extrabold tracking-tighter text-on-background mt-2">
                ACTIVE ASSIGNMENTS
              </h1>
              <p className="text-on-surface-variant mt-4 text-base font-normal leading-relaxed">
                Refining the craft through intentional practice. Manage your
                ongoing projects and track progress across the curriculum.
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 flex-shrink-0">
              <div className="bg-surface-container-high px-4 md:px-6 py-3 md:py-4 flex flex-col min-w-[130px] md:min-w-[140px]">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Completed
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-primary">
                  12/15
                </span>
              </div>
            </div>
          </header>

          {/* Category Filter */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-2xl font-bold text-on-background mb-4 md:mb-6">
              Filter by Course &amp; Instructor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {uniqueCategories.map((cat) => (
                <button
                  key={cat.code}
                  className={`p-4 border text-left transition-all hover:border-primary group ${
                    selectedCategory === cat.code
                      ? "border-primary bg-primary-container"
                      : "bg-surface border-outline"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.code ? null : cat.code
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                        Instructor
                      </p>
                      <p className="text-sm font-bold text-on-background mb-3">
                        {cat.instructor}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                        Course
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {cat.course}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {cat.code}
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 md:px-6 py-2 bg-surface-container text-on-background border border-outline hover:bg-surface-container-high transition-colors text-xs md:text-sm font-semibold"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Assignments List */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-on-background">
                  Upcoming Submissions
                </h2>
                <div className="flex gap-2">
                  <button
                    className="p-2 text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors"
                    title="Grid view"
                    aria-label="Switch to grid view"
                  >
                    <span className="material-symbols-outlined text-base md:text-xl" aria-hidden="true">
                      grid_view
                    </span>
                  </button>
                  <button
                    className="p-2 text-primary bg-primary-container cursor-pointer"
                    title="List view"
                    aria-label="Switch to list view"
                  >
                    <span className="material-symbols-outlined text-base md:text-xl" aria-hidden="true">
                      list
                    </span>
                  </button>
                </div>
              </div>

              {filteredAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onOpen={handleOpenAssignment}
                  onViewReceipt={handleViewReceipt}
                />
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              {/* Upcoming Deadlines */}
              <div className="bg-surface p-4 md:p-6 border border-outline">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 md:mb-6">
                  Upcoming Deadlines
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { month: "OCT", day: "24", title: "Spatial Dynamics Paper", sub: "11:59 PM Submission", urgent: true },
                    { month: "OCT", day: "28", title: "Peer Review: Session 04", sub: "In-class Collaboration", urgent: false },
                    { month: "NOV", day: "02", title: "Typography Final Case", sub: "Portfolio Milestone", urgent: false },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex gap-3 md:gap-4 ${idx === 2 ? "opacity-60" : ""}`}>
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-surface-container flex flex-col items-center justify-center shrink-0 text-xs md:text-sm">
                        <span className="font-bold text-on-surface-variant">{item.month}</span>
                        <span className={`font-bold ${item.urgent ? "text-primary" : "text-on-background"}`}>
                          {item.day}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold text-on-background leading-tight">
                          {item.title}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 md:mt-8 py-2 md:py-3 text-primary border border-primary/20 text-xs font-bold hover:bg-primary-container transition-colors">
                  View Full Schedule
                </button>
              </div>

              {/* Faculty Feedback */}
              <div className="bg-tertiary text-on-tertiary p-4 md:p-6 overflow-hidden relative">
                <div
                  className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-6xl md:text-9xl">
                    forum
                  </span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 md:mb-4 relative z-10">
                  Faculty Feedback
                </h3>
                <p className="text-xs md:text-sm font-normal leading-relaxed relative z-10 italic">
                  &ldquo;Excellent use of white space in your last module. Focus
                  on the grid consistency for the next submission.&rdquo;
                </p>
                <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3 relative z-10">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold">Dr. Elena Vos</p>
                    <p className="text-xs opacity-80 uppercase tracking-tighter">
                      Design Theory Lead
                    </p>
                  </div>
                </div>
              </div>

              {/* Semester Progress */}
              <div className="bg-surface p-4 md:p-6 border border-outline">
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4">
                  Semester Progress
                </h3>
                <div className="relative h-24 md:h-32 flex items-center justify-center mb-3 md:mb-4">
                  <svg
                    className="w-20 md:w-24 h-20 md:h-24 transform -rotate-90"
                    viewBox="0 0 96 96"
                    aria-label="80% course completion"
                    role="img"
                  >
                    <circle
                      className="text-surface-container-high"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-primary"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="50"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg md:text-xl font-extrabold text-on-background">
                      80%
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant uppercase">
                      Course
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center">
                    <p className="text-base md:text-lg font-bold text-on-background">
                      3.82
                    </p>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                      Current GPA
                    </p>
                  </div>
                  <div className="text-center border-l border-outline/20">
                    <p className="text-base md:text-lg font-bold text-on-background">
                      42
                    </p>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                      Credits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
