import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import PageFooter from "@/components/PageFooter";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Resources" };

/* ── Resource Card ────────────────────────────────────── */
interface ResourceCardProps {
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  description: string;
  meta: string;
  badge?: string;
  badgeColor?: string;
}

function ResourceCard({ iconBg, iconColor, icon, title, description, meta, badge, badgeColor }: ResourceCardProps) {
  return (
    <div className="p-6 bg-white border border-outline/30 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${iconBg}`}>
          <span className={`material-symbols-outlined ${iconColor} text-xl`} aria-hidden="true">{icon}</span>
        </div>
        <button className="text-slate-400 hover:text-primary transition-colors" aria-label="Download">
          <span className="material-symbols-outlined" aria-hidden="true">download</span>
        </button>
      </div>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono text-slate-400 uppercase">{meta}</span>
        {badge && (
          <span className={`text-[10px] font-mono font-bold ${badgeColor ?? "text-primary"}`}>{badge}</span>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <TopBar placeholder="SEARCH RESOURCES..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">

          <Breadcrumb crumbs={[{ label: "Dashboard", href: "/" }, { label: "Resources" }]} />

          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Resource Library
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Learning Materials // Fall 2024
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">

            {/* ── Main Column (8 cols) ── */}
            <section className="col-span-8 flex flex-col gap-8" aria-label="Resource library">

              {/* Lecture Notes */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Lecture Notes
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <ResourceCard
                    iconBg="bg-primary-container" iconColor="text-primary" icon="description"
                    title="Advanced Algorithms Part 1"
                    description="Graph theory fundamentals and complexity analysis"
                    meta="PDF • 3.2 MB" badge="UPDATED" badgeColor="text-primary"
                  />
                  <ResourceCard
                    iconBg="bg-primary-container" iconColor="text-primary" icon="description"
                    title="Database Design Fundamentals"
                    description="Relational model and normalization concepts"
                    meta="PDF • 2.8 MB" badge="3 days ago" badgeColor="text-slate-400"
                  />
                </div>
              </section>

              {/* Research Papers */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Research Papers
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <ResourceCard
                    iconBg="bg-error-container" iconColor="text-error" icon="picture_as_pdf"
                    title="Machine Learning Ethics"
                    description="Bias and fairness in AI systems. Published in IEEE 2024"
                    meta="PDF • 4.5 MB" badge="FEATURED" badgeColor="text-primary"
                  />
                  <ResourceCard
                    iconBg="bg-error-container" iconColor="text-error" icon="picture_as_pdf"
                    title="Neural Networks Architecture"
                    description="Deep learning frameworks and optimization techniques"
                    meta="PDF • 5.1 MB" badge="1 week ago" badgeColor="text-slate-400"
                  />
                </div>
              </section>

              {/* Code Examples */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Code Examples
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <ResourceCard
                    iconBg="bg-secondary-container" iconColor="text-secondary" icon="code"
                    title="Python Data Processing"
                    description="Pandas and NumPy implementation examples"
                    meta="ZIP • 1.2 MB" badge="2 days ago" badgeColor="text-slate-400"
                  />
                  <ResourceCard
                    iconBg="bg-secondary-container" iconColor="text-secondary" icon="code"
                    title="Web Development Starter Kit"
                    description="HTML5, CSS3, and JavaScript fundamentals"
                    meta="ZIP • 2.3 MB" badge="NEW" badgeColor="text-primary"
                  />
                </div>
              </section>

            </section>

            {/* ── Sidebar (4 cols) ── */}
            <aside className="col-span-4 flex flex-col gap-8" aria-label="Resource summary">

              {/* Storage Information */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Storage Usage
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-[10px] font-mono text-slate-500">
                      <span>Used</span>
                      <span>1.2 GB / 5 GB</span>
                    </div>
                    <div className="h-2 bg-outline border border-outline">
                      <div className="h-full bg-primary" style={{ width: "24%" }} role="progressbar" aria-valuenow={24} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                  <button className="w-full mt-6 py-2 px-4 bg-primary-container text-primary font-bold text-sm hover:bg-primary-container border border-primary transition-colors">
                    Upgrade Storage
                  </button>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Recent Activity
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-primary pl-4">
                    <p className="text-[10px] font-bold uppercase text-on-surface">Downloaded: Advanced Algorithms</p>
                    <time className="text-[10px] font-mono text-slate-500 uppercase">15 mins ago</time>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <p className="text-[10px] font-bold uppercase text-on-surface">Downloaded: Database Design</p>
                    <time className="text-[10px] font-mono text-slate-500 uppercase">2 hours ago</time>
                  </li>
                  <li className="border-l-2 border-outline pl-4">
                    <p className="text-[10px] font-bold uppercase text-on-surface">Uploaded: Lab Report V2</p>
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
