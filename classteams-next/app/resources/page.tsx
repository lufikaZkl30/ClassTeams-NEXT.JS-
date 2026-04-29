import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Resources",
};

interface Resource {
  id: number;
  title: string;
  type: "PDF" | "VIDEO" | "LINK" | "DOC";
  course: string;
  size?: string;
  duration?: string;
  date: string;
  icon: string;
}

const LECTURE_NOTES: Resource[] = [
  {
    id: 1,
    title: "Graph Theory Fundamentals",
    type: "PDF",
    course: "ALGO301",
    size: "2.4 MB",
    date: "Oct 18",
    icon: "picture_as_pdf",
  },
  {
    id: 2,
    title: "HCI Pattern Library",
    type: "PDF",
    course: "HCI205",
    size: "5.1 MB",
    date: "Oct 15",
    icon: "picture_as_pdf",
  },
  {
    id: 3,
    title: "Typography Systems",
    type: "DOC",
    course: "VIS102",
    size: "1.8 MB",
    date: "Oct 10",
    icon: "description",
  },
  {
    id: 4,
    title: "Urban Space Analysis",
    type: "PDF",
    course: "ARCH101",
    size: "3.2 MB",
    date: "Oct 8",
    icon: "picture_as_pdf",
  },
];

const VIDEO_RESOURCES: Resource[] = [
  {
    id: 5,
    title: "Gestalt Principles in Practice",
    type: "VIDEO",
    course: "HCI205",
    duration: "42 min",
    date: "Oct 16",
    icon: "play_circle",
  },
  {
    id: 6,
    title: "Recursive Algorithm Deep Dive",
    type: "VIDEO",
    course: "ALGO301",
    duration: "1h 08min",
    date: "Oct 12",
    icon: "play_circle",
  },
];

const EXTERNAL_LINKS: Resource[] = [
  {
    id: 7,
    title: "ACM Digital Library Access",
    type: "LINK",
    course: "General",
    date: "Permanent",
    icon: "open_in_new",
  },
  {
    id: 8,
    title: "Figma Educational License",
    type: "LINK",
    course: "DMS204",
    date: "Active",
    icon: "open_in_new",
  },
];

const typeBadgeClasses: Record<Resource["type"], string> = {
  PDF: "bg-red-50 text-red-700",
  VIDEO: "bg-blue-50 text-blue-700",
  LINK: "bg-green-50 text-green-700",
  DOC: "bg-yellow-50 text-yellow-700",
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="p-6 bg-white border border-outline/30 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <span
          className="material-symbols-outlined text-primary text-2xl"
          aria-hidden="true"
        >
          {resource.icon}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${typeBadgeClasses[resource.type]}`}
        >
          {resource.type}
        </span>
      </div>
      <h4 className="text-sm font-bold text-on-background mb-2 leading-snug group-hover:text-primary transition-colors">
        {resource.title}
      </h4>
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-mono text-on-surface-variant uppercase">
          {resource.course}
        </span>
        <span className="text-[10px] font-mono text-slate-400 uppercase">
          {resource.size ?? resource.duration ?? resource.date}
        </span>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Header searchPlaceholder="SEARCH RESOURCES..." />

      <main className="p-12 flex-grow bg-background">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Resources" },
            ]}
          />

          {/* Page Header */}
          <header className="mb-16">
            <h2 className="text-6xl font-extrabold tracking-tighter uppercase mb-2 text-on-background">
              Resource Library
            </h2>
            <p className="text-sm font-mono text-primary tracking-widest uppercase">
              Learning Materials // Fall 2024
            </p>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <section className="col-span-8 flex flex-col gap-12" aria-label="Resource library">

              {/* Lecture Notes */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Lecture Notes
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {LECTURE_NOTES.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </section>

              {/* Video Resources */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  Video Resources
                </h3>
                <div className="flex flex-col gap-4">
                  {VIDEO_RESOURCES.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-6 p-4 md:p-6 bg-white border border-outline/30 hover:border-primary transition-colors cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">
                          play_circle
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-on-background group-hover:text-primary transition-colors">
                          {r.title}
                        </h4>
                        <p className="text-[10px] font-mono text-on-surface-variant uppercase mt-1">
                          {r.course} • {r.duration}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* External Links */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-4 border-b border-outline">
                  External Links &amp; Tools
                </h3>
                <div className="flex flex-col gap-3">
                  {EXTERNAL_LINKS.map((r) => (
                    <a
                      key={r.id}
                      href="#"
                      className="flex items-center gap-4 p-4 bg-white border border-outline/30 hover:border-primary hover:text-primary transition-colors group"
                    >
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">
                        {r.icon}
                      </span>
                      <span className="text-sm font-bold flex-1">{r.title}</span>
                      <span className="text-[10px] font-mono text-on-surface-variant uppercase">
                        {r.course}
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            </section>

            {/* Right Sidebar */}
            <aside className="col-span-4 flex flex-col gap-8" aria-label="Library stats">
              {/* Upload New Resource */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">
                  Add Resource
                </h3>
                <div className="border-2 border-dashed border-outline/40 hover:border-primary transition-colors p-6 text-center cursor-pointer group">
                  <span className="material-symbols-outlined text-2xl text-slate-300 group-hover:text-primary transition-colors mb-2 block" aria-hidden="true">
                    upload
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                    Drop files or click to upload
                  </p>
                </div>
                <button className="w-full mt-4 bg-primary text-on-primary py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
                  Upload Resource
                </button>
              </section>

              {/* Library Stats */}
              <section className="bg-tertiary p-8 text-on-tertiary">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-8 text-slate-400">
                  Library Stats
                </h3>
                <dl className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                    <dt className="text-[10px] uppercase font-bold">Total Files</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter text-primary-container">
                      48
                    </dd>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                    <dt className="text-[10px] uppercase font-bold">This Week</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter">
                      06
                    </dd>
                  </div>
                  <div className="flex justify-between items-end">
                    <dt className="text-[10px] uppercase font-bold">Storage Used</dt>
                    <dd className="text-3xl font-extrabold tracking-tighter text-blue-400">
                      64%
                    </dd>
                  </div>
                </dl>
              </section>

              {/* Recent Additions */}
              <section className="bg-white p-8 border border-outline/30">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-6 text-primary font-bold">
                  Recent Additions
                </h3>
                <ul className="space-y-4">
                  {LECTURE_NOTES.slice(0, 3).map((r) => (
                    <li key={r.id} className="flex items-center gap-3 border-l-2 border-outline/30 pl-3 hover:border-primary transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-base text-on-surface-variant" aria-hidden="true">
                        {r.icon}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-on-surface leading-tight">
                          {r.title}
                        </p>
                        <time className="text-[10px] font-mono text-slate-500 uppercase">
                          {r.date}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
