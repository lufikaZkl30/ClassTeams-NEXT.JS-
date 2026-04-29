interface RightSidebarProps {
  openTasks: number;
  completedTasks: number;
  complianceRate: number;
}

export default function RightSidebar({
  openTasks,
  completedTasks,
  complianceRate,
}: RightSidebarProps) {
  return (
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
              {String(openTasks).padStart(2, "0")}
            </dd>
          </div>
          <div className="flex justify-between items-end border-b border-slate-800 pb-2">
            <dt className="text-[10px] uppercase font-bold">Completed</dt>
            <dd className="text-3xl font-extrabold tracking-tighter">
              {completedTasks}
            </dd>
          </div>
          <div className="flex justify-between items-end">
            <dt className="text-[10px] uppercase font-bold">Compliance Rate</dt>
            <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">
              {complianceRate}%
            </dd>
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
            <time className="text-[10px] font-mono text-slate-500 uppercase">
              2 hours ago
            </time>
          </li>
          <li className="border-l-2 border-outline pl-4">
            <p className="text-[10px] font-bold uppercase text-on-surface">
              Resource Added: Beam Strength PDF
            </p>
            <time className="text-[10px] font-mono text-slate-500 uppercase">
              Yesterday
            </time>
          </li>
          <li className="border-l-2 border-outline/40 pl-4">
            <p className="text-[10px] font-bold uppercase text-on-surface">
              Schedule Updated: Week 12
            </p>
            <time className="text-[10px] font-mono text-slate-500 uppercase">
              2 days ago
            </time>
          </li>
        </ul>
      </section>
    </aside>
  );
}
