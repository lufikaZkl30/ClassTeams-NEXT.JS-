'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const days = [
  { label: 'MON', num: 21, active: false, hasEvent: false, dimmed: false },
  { label: 'TUE', num: 22, active: true, hasEvent: true, dimmed: false },
  { label: 'WED', num: 23, active: false, hasEvent: false, dimmed: true },
  { label: 'THU', num: 24, active: false, hasEvent: true, dimmed: false },
  { label: 'FRI', num: 25, active: false, hasEvent: false, dimmed: false },
  { label: 'SAT', num: 26, active: false, hasEvent: false, dimmed: true },
  { label: 'SUN', num: 27, active: false, hasEvent: false, dimmed: true },
];

export default function SchedulePage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH SCHEDULE..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold">Schedule</li>
              </ol>
            </nav>

            <header className="mb-16">
              <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Weekly Schedule</h2>
              <p className="text-sm font-mono text-primary tracking-widest uppercase">Academic Sessions // Fall 2024</p>
            </header>

            <div className="grid grid-cols-12 gap-8">
              <section className="col-span-8 flex flex-col gap-8" aria-label="Weekly schedule">

                {/* Date Navigation */}
                <div className="flex items-center justify-between bg-white p-4 border border-outline-variant">
                  <button className="text-primary hover:bg-surface-container p-2">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <h3 className="text-sm font-bold uppercase tracking-wider">Oct 21 — Oct 27, 2024</h3>
                  <button className="text-primary hover:bg-surface-container p-2">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                {/* Day Tracker */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day) => (
                    <div
                      key={day.label}
                      className={`flex flex-col items-center p-4 border text-center
                        ${day.active ? 'bg-primary text-on-primary border-primary' : 'bg-white border-outline-variant'}
                        ${day.dimmed ? 'opacity-50 bg-surface-container' : ''}
                      `}
                    >
                      <span className={`text-[10px] font-bold uppercase ${day.active ? '' : 'text-on-surface-variant'}`}>{day.label}</span>
                      <span className="text-2xl font-extrabold mt-2">{day.num}</span>
                      {day.hasEvent && <div className={`w-2 h-2 ${day.active ? 'bg-on-primary' : 'bg-primary'} rounded-full mt-2`}></div>}
                    </div>
                  ))}
                </div>

                {/* Today's Sessions */}
                <section className="bg-white p-8 border border-outline-variant">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-8 pb-4 border-b border-outline-variant">Today's Sessions</h3>

                  <div className="flex gap-6 mb-8 pb-8 border-b border-outline-variant">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold">09:00</span>
                      <div className="w-0.5 h-12 bg-outline-variant my-3"></div>
                      <span className="text-sm font-medium text-on-surface-variant">10:30</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Lecture • Hall A1</span>
                      </div>
                      <h4 className="text-base font-bold mb-2">Advanced Algorithm Structuralism</h4>
                      <p className="text-sm text-on-surface-variant">Focus on graph theory applications in neural networks and ethical bias in recursive sorting.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 mb-8 pb-8 border-b border-outline-variant bg-primary-container p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-primary">11:00</span>
                      <div className="w-0.5 h-12 bg-primary/30 my-3"></div>
                      <span className="text-sm font-medium text-on-surface-variant">12:30</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Lab Session • Studio 4 • ACTIVE NOW</span>
                      </div>
                      <h4 className="text-base font-bold mb-4">Human-Computer Interaction Workshop</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-white text-on-surface text-[10px] font-bold uppercase">Figma Collab</span>
                        <span className="px-3 py-1 bg-white text-on-surface text-[10px] font-bold uppercase">Group Project</span>
                      </div>
                      <button className="bg-primary text-on-primary px-4 py-2 text-sm font-bold hover:bg-blue-700 transition-colors">Join Stream</button>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold">14:00</span>
                      <div className="w-0.5 h-12 bg-outline-variant my-3"></div>
                      <span className="text-sm font-medium text-on-surface-variant">15:30</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Seminar • Virtual</span>
                      </div>
                      <h4 className="text-base font-bold mb-2">Cognitive Psychology in UX Design</h4>
                      <p className="text-sm text-on-surface-variant">Review of Gestalt principles and user mental mapping strategies.</p>
                    </div>
                  </div>
                </section>
              </section>

              {/* Sidebar Stats */}
              <aside className="col-span-4 flex flex-col gap-8" aria-label="Schedule summary">
                <section className="bg-white p-8 border border-outline-variant">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-error">priority_high</span>
                    Critical Deadlines
                  </h3>
                  <ul className="space-y-4">
                    <li className="pb-4 border-l-2 border-error pl-4">
                      <p className="text-[10px] font-bold text-error uppercase tracking-wider">In 4 Hours</p>
                      <h5 className="font-bold text-on-surface">Data Structures Midterm Prep</h5>
                      <p className="text-[10px] text-on-surface-variant mt-1">Submit draft module by 18:00</p>
                    </li>
                    <li className="pb-4 border-l-2 border-primary pl-4">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Tomorrow</p>
                      <h5 className="font-bold text-on-surface">Spatial Dynamics Assignment</h5>
                      <p className="text-[10px] text-on-surface-variant mt-1">Final submission by 23:59</p>
                    </li>
                  </ul>
                </section>

                <section className="bg-tertiary p-8 text-on-tertiary">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-8 text-slate-400">Session Summary</h3>
                  <dl className="flex flex-col gap-4">
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">Today's Sessions</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-primary-container">03</dd>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                      <dt className="text-[10px] uppercase font-bold">This Week</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter">12</dd>
                    </div>
                    <div className="flex justify-between items-end">
                      <dt className="text-[10px] uppercase font-bold">Attendance</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">96%</dd>
                    </div>
                  </dl>
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
