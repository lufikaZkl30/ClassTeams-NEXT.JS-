import Link from "next/link";
import {
  Task,
  getStatusColorClasses,
  getPriorityColorClasses,
} from "@/lib/types";

interface PostCardProps {
  task: Task;
  onDelete?: (id: number) => void;
}

export default function PostCard({ task, onDelete }: PostCardProps) {
  return (
    <article className="group animate-fade-in">
      {/* Card Header */}
      <header className="flex items-start justify-between bg-surface-container-high p-6 mb-[1px]">
        <hgroup>
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">
            CODE: {task.code}
          </span>
          <h3 className="text-2xl font-bold tracking-tight uppercase text-on-background">
            {task.title}
          </h3>
        </hgroup>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-1 ${getStatusColorClasses(task.status)}`}
        >
          {task.status}
        </span>
      </header>

      {/* Card Footer */}
      <footer className="bg-white p-6 flex justify-between items-end border-b border-outline/20">
        <dl className="flex gap-12">
          <div>
            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Deadline
            </dt>
            <dd className="font-mono text-sm uppercase text-on-surface">
              {task.deadline}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Instructor
            </dt>
            <dd className="font-mono text-sm uppercase text-on-surface">
              {task.instructor}
            </dd>
          </div>
          {task.priority && (
            <div>
              <dt className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Priority
              </dt>
              <dd
                className={`font-mono text-sm uppercase ${getPriorityColorClasses(task.priority)}`}
              >
                {task.priority}
              </dd>
            </div>
          )}
        </dl>

        <div className="flex items-center gap-3">
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="text-slate-400 hover:text-error transition-colors p-1"
              aria-label={`Delete task: ${task.title}`}
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                delete
              </span>
            </button>
          )}
          <Link
            href={`/detail-teams?id=${task.id}`}
            className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
          >
            Open Case
          </Link>
        </div>
      </footer>
    </article>
  );
}
