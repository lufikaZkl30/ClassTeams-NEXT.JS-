import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Schedule",
};

const DAYS = [
  { abbr: "MON", num: 21, active: false, today: false, hasDot: false },
  { abbr: "TUE", num: 22, active: true, today: true, hasDot: true },
  { abbr: "WED", num: 23, active: false, today: false, hasDot: false },
  { abbr: "THU", num: 24, active: false, today: false, hasDot: true },
  { abbr: "FRI", num: 25, active: false, today: false, hasDot: false },
  { abbr: "SAT", num: 26, active: false, today: false, hasDot: false, weekend: true },
  { abbr: "SUN", num: 27, active: false, today: false, hasDot: false, weekend: true },
];

const SESSIONS = [
  {
    start: "09:00",
    end: "10:30",
    type: "Lecture • Hall A1",
    title: "Advanced Algorithm Structuralism",
    description:
      "Focus on graph theory applications in neural networks and ethical bias in recursive sorting.",
    isActive: false,
    tags: [],
  },
  {
    start: "11:00",
    end: "12:30",
    type: "Lab Session • Studio 4 • ACTIVE NOW",
    title: "Human-Computer Interaction Workshop",
    description: null,
    isActive: true,
    tags: ["Figma Collab", "Group Project"],
  },
  {
    start: "14:00",
    end: "15:30",
    type: "Seminar • Virtual",
    title: "Cognitive Psychology in UX Design",
    description:
      "Review of Gestalt principles and user mental mapping strategies.",
    isActive: false,
    tags: [],
  },
];

export default function SchedulePage() {
  return (
    <>
      <Header searchPlaceholder="SEARCH SCHEDULE..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Schedule" },
            ]}
          />

          {/* Page Header */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Weekly Schedule
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Academic Sessions // Fall 2024
            </p>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Schedule Column */}
            <section className="col-span-8 flex flex-col gap-8" aria-label="Weekly schedule">

              {/* Date Navigation */}
              <div className="flex items-center justify-between bg-white p-4 border border-outline-variant">
                <button
                  className="text-primary hover:bg-surface-container p-2 transition-colors"
                  aria-label="Previous week"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                </button>
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Oct 21 — Oct 27, 2024
                </h3>
                <button
                  className="text-primary hover:bg-surface-container p-2 transition-colors"
                  aria-label="Next week"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                </button>
              </div>

              {/* Day Tracker */}
              <div className="grid grid-cols-7 gap-2" role="list" aria-label="Week days">
                {DAYS.map((day) => (
                  <div
                    key={day.abbr}
                    role="listitem"
                    className={`flex flex-col items-center p-4 border text-center transition-colors ${
                      day.active
                        ? "bg-primary text-on-primary border-primary"
                        : day.weekend
                        ? "bg-surface-container border-outline-variant opacity-50"
                        : "bg-white border-outline-variant"
                    }`}
                  >
                    <span className={`text-[10px] font-bold uppercase ${day.active ? "" : "text-on-surface-variant"}`}>
                      {day.abbr}
                    </span>
                    <span className="text-2xl font-extrabold mt-2">{day.num}</span>
                    {day.hasDot && (
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${day.active ? "bg-on-primary" : "bg-primary"}`}
                        aria-label="Has events"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Today's Sessions */}
              <section className="bg-white p-8 border border-outline-variant">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-8 pb-4 border-b border-outline-variant">
                  Today&apos;s Sessions
                </h3>

                {SESSIONS.map((session, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-6 ${idx < SESSIONS.length - 1 ? "mb-8 pb-8 border-b border-outline-variant" : ""} ${
                      session.isActive ? "bg-primary-container p-4" : ""
                    }`}
                  >
                    {/* Time Column */}
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-bold ${session.isActive ? "text-primary" : ""}`}>
                        {session.start}
                      </span>
                      <div className={`w-0.5 h-12 my-3 ${session.isActive ? "bg-primary/30" : "bg-outline-variant"}`} />
                      <span className="text-sm font-medium text-on-surface-variant">
                        {session.end}
                      </span>
                    </div>

                    {/* Session Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-2 h-2 rounded-full ${session.isActive ? "bg-primary animate-pulse" : "bg-secondary"}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${session.isActive ? "text-primary" : "text-on-surface-variant"}`}
                        >
                          {session.type}
                        </span>
                      </div>
                      <h4 className="text-base font-bold mb-2">{session.title}</h4>
                      {session.description && (
                        <p className="text-sm text-on-surface-variant">{session.description}</p>
                      )}
                      {session.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {session.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white text-on-surface text-[10px] font-bold uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {session.isActive && (
                        <button className="bg-primary text-on-primary px-4 py-2 text-sm font-bold hover:bg-blue-700 transition-colors">
                          Join Stream
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            </section>

            {/* Right Sidebar */}
            <aside className="col-span-4 flex flex-col gap-8" aria-label="Schedule summary">

              {/* Critical Deadlines */}
              <section className="bg-white p-8 border border-outline-variant">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-error" aria-hidden="true">priority_high</span>
                  Critical Deadlines
                </h3>
                <ul className="space-y-4">
                  <li className="pb-4 border-l-2 border-error pl-4">
                    <p className="text-[10px] font-bold text-error uppercase tracking-wider">
                      In 4 Hours
                    </p>
                    <h5 className="font-bold text-on-surface">
                      Data Structures Midterm Prep
                    </h5>
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      Submit draft module by 18:00
                    </p>
                  </li>
                  <li className="pb-4 border-l-2 border-primary pl-4">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      Tomorrow
                    </p>
                    <h5 className="font-bold text-on-surface">
                      Interactive Prototype V2
                    </h5>
                    <div className="mt-2 w-full bg-surface-container h-2" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                      <div className="bg-primary h-full" style={{ width: "75%" }} />
                    </div>
                  </li>
                  <li className="border-l-2 border-outline pl-4">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Thursday
                    </p>
                    <h5 className="font-bold text-on-surface">
                      The Ethical AI Essay
                    </h5>
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      Peer review session scheduled
                    </p>
                  </li>
                </ul>
                <button className="w-full mt-6 pt-4 border-t border-outline-variant text-primary font-bold text-sm hover:bg-surface-container transition-colors">
                  View Full Gradebook
                </button>
              </section>

              {/* Academic Progress */}
              <section className="bg-tertiary text-on-tertiary p-8 border border-tertiary">
                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-6">
                  Academic Momentum
                </h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Task Completion</span>
                      <span className="font-bold">82%</span>
                    </div>
                    <div className="w-full bg-white/20 h-2" role="progressbar" aria-valuenow={82} aria-valuemin={0} aria-valuemax={100}>
                      <div className="bg-primary-container h-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                    <div className="w-10 h-10 bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">auto_awesome</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70">Next Milestone</p>
                      <p className="text-sm font-bold">Research Excellence Badge</p>
                    </div>
                  </div>
                </div>
              </section>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
