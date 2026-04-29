"use client";

import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "@/lib/types";

type NewTask = Omit<Task, "id">;

interface Props {
  onCreate: (t: NewTask) => void;
}

const blank: NewTask = {
  code: "", title: "", deadline: "", instructor: "",
  status: "PENDING", priority: "NORMAL", course: "", description: "",
};

export default function NewPostBox({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewTask>(blank);

  const set = (k: keyof NewTask, v: string) => setForm(p => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.code) return;
    onCreate(form);
    setForm(blank);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-4 bg-white border border-dashed border-outline/40 px-6 py-4 text-on-surface-variant hover:border-primary hover:text-primary transition-all group"
      >
        <span className="material-symbols-outlined group-hover:scale-110 transition-transform" aria-hidden="true">add_circle</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">New Task Entry</span>
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-primary p-6 fade-in">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-primary mb-6 font-bold">
        New Task Entry
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Course Code *">
          <input required value={form.code} onChange={e => set("code", e.target.value)}
            className="input-field" placeholder="ARCH101" />
        </Field>
        <Field label="Course Name">
          <input value={form.course} onChange={e => set("course", e.target.value)}
            className="input-field" placeholder="Foundations of Architecture" />
        </Field>
      </div>

      <Field label="Task Title *" className="mb-4">
        <input required value={form.title} onChange={e => set("title", e.target.value)}
          className="input-field" placeholder="Spatial Dynamics in Urban Design" />
      </Field>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Deadline">
          <input value={form.deadline} onChange={e => set("deadline", e.target.value)}
            className="input-field" placeholder="OCT 24, 2023" />
        </Field>
        <Field label="Instructor">
          <input value={form.instructor} onChange={e => set("instructor", e.target.value)}
            className="input-field" placeholder="Dr. James Mitchell" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Field label="Status">
          <select value={form.status} onChange={e => set("status", e.target.value as TaskStatus)} className="input-field">
            <option value="PENDING">Pending</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="COMPLETED">Completed</option>
            <option value="REVISED">Revised</option>
          </select>
        </Field>
        <Field label="Priority">
          <select value={form.priority} onChange={e => set("priority", e.target.value as TaskPriority)} className="input-field">
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </Field>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
          Create Task
        </button>
        <button type="button" onClick={() => setOpen(false)}
          className="border border-outline px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}
