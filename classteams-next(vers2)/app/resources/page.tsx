'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const resources = {
  'Lecture Notes': [
    { icon: 'description', iconBg: 'bg-primary-container', iconColor: 'text-primary', title: 'Advanced Algorithms Part 1', desc: 'Graph theory fundamentals and complexity analysis', meta: 'PDF • 3.2 MB', badge: 'UPDATED', badgeColor: 'text-primary' },
    { icon: 'description', iconBg: 'bg-primary-container', iconColor: 'text-primary', title: 'Database Design Fundamentals', desc: 'Relational model and normalization concepts', meta: 'PDF • 2.8 MB', badge: '3 days ago', badgeColor: 'text-slate-400' },
  ],
  'Research Papers': [
    { icon: 'picture_as_pdf', iconBg: 'bg-red-50', iconColor: 'text-error', title: 'Machine Learning Ethics', desc: 'Bias and fairness in AI systems. Published in IEEE 2024', meta: 'PDF • 4.5 MB', badge: 'FEATURED', badgeColor: 'text-primary' },
    { icon: 'picture_as_pdf', iconBg: 'bg-red-50', iconColor: 'text-error', title: 'Neural Networks Architecture', desc: 'Deep learning frameworks and optimization techniques', meta: 'PDF • 5.1 MB', badge: '1 week ago', badgeColor: 'text-slate-400' },
  ],
  'Code Examples': [
    { icon: 'code', iconBg: 'bg-secondary-container', iconColor: 'text-secondary', title: 'Sorting Algorithms', desc: 'Implementation of quicksort, mergesort, and heapsort', meta: 'ZIP • 1.2 MB', badge: 'NEW', badgeColor: 'text-primary' },
    { icon: 'code', iconBg: 'bg-secondary-container', iconColor: 'text-secondary', title: 'Graph Traversal Examples', desc: 'BFS, DFS and Dijkstra implementations in Python', meta: 'ZIP • 0.8 MB', badge: '5 days ago', badgeColor: 'text-slate-400' },
  ],
};

export default function ResourcesPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH RESOURCES..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold">Resources</li>
              </ol>
            </nav>

            <header className="mb-16">
              <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">Resource Library</h2>
              <p className="text-sm font-mono text-primary tracking-widest uppercase">Learning Materials // Fall 2024</p>
            </header>

            <div className="grid grid-cols-12 gap-8">
              <section className="col-span-8 flex flex-col gap-8" aria-label="Resource library">
                {Object.entries(resources).map(([category, items]) => (
                  <section key={category}>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">{category}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {items.map((r, i) => (
                        <div key={i} className="p-6 bg-white border border-outline hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 ${r.iconBg}`}>
                              <span className={`material-symbols-outlined ${r.iconColor} text-xl`}>{r.icon}</span>
                            </div>
                            <button className="text-slate-400 hover:text-primary transition-colors" aria-label="Download">
                              <span className="material-symbols-outlined">download</span>
                            </button>
                          </div>
                          <h4 className="font-bold mb-2">{r.title}</h4>
                          <p className="text-sm text-slate-500 mb-4">{r.desc}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">{r.meta}</span>
                            <span className={`text-[10px] font-mono font-bold ${r.badgeColor}`}>{r.badge}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </section>

              <aside className="col-span-4 flex flex-col gap-8">
                <section className="bg-white p-8 border border-outline-variant">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Library Stats</h3>
                  <dl className="flex flex-col gap-4">
                    <div className="flex justify-between items-end border-b border-outline pb-2">
                      <dt className="text-[10px] uppercase font-bold text-slate-400">Total Files</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-primary">24</dd>
                    </div>
                    <div className="flex justify-between items-end border-b border-outline pb-2">
                      <dt className="text-[10px] uppercase font-bold text-slate-400">New This Week</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter">06</dd>
                    </div>
                    <div className="flex justify-between items-end">
                      <dt className="text-[10px] uppercase font-bold text-slate-400">Downloads</dt>
                      <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">142</dd>
                    </div>
                  </dl>
                </section>

                <section className="bg-white p-8 border border-outline-variant">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Recent Uploads</h3>
                  <ul className="space-y-4">
                    <li className="border-l-2 border-primary pl-4">
                      <p className="text-[10px] font-bold uppercase text-on-surface">Beam Strength Analysis PDF</p>
                      <time className="text-[10px] font-mono text-slate-500 uppercase">Yesterday</time>
                    </li>
                    <li className="border-l-2 border-outline pl-4">
                      <p className="text-[10px] font-bold uppercase text-on-surface">Design Patterns Vol. 3</p>
                      <time className="text-[10px] font-mono text-slate-500 uppercase">2 days ago</time>
                    </li>
                    <li className="border-l-2 border-outline pl-4">
                      <p className="text-[10px] font-bold uppercase text-on-surface">Typography Specimens</p>
                      <time className="text-[10px] font-mono text-slate-500 uppercase">3 days ago</time>
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
