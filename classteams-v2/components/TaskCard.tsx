import Link from "next/link";
import { Task, statusClasses, priorityClasses } from "@/lib/types";

interface Props {
  task: Task;
  onDelete?: (id: number) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <article className="group fade-in">
      {/* Header */}
      <header className="flex items-start justify-between bg-surface-container-high p-6 mb-[1px]">
        <hgroup>
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">
            CODE: {task.code}
          </span>
          <h3 className="text-2xl font-bold tracking-tight uppercase text-on-background">
            {task.title}
          </h3>
        </hgroup>
        <span className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-1 ${statusClasses(task.status)}`}>
          {task.status}
        </span>
      </header>

      {/* Footer */}
      <footer className="bg-white p-6 flex justify-between items-end border-b border-outline/20">
        <dl className="flex gap-12">
          <div>
            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Deadline</dt>
            <dd className="font-mono text-sm uppercase">{task.deadline}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Instructor</dt>
            <dd className="font-mono text-sm uppercase">{task.instructor}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">Priority</dt>
            <dd className={`font-mono text-sm uppercase ${priorityClasses(task.priority)}`}>
              {task.priority}
            </dd>
          </div>
        </dl>
        <div className="flex items-center gap-3">
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="text-slate-300 hover:text-error transition-colors"
              aria-label="Delete task"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          )}
          <Link
            href="/assignments"
            className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
          >
            Open Case
          </Link>
        </div>
      </footer>
    </article>
  );
}
