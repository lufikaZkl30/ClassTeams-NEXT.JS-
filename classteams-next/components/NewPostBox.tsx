"use client";

import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "@/lib/types";

interface NewPostBoxProps {
  onCreateTask: (task: Omit<Task, "id">) => void;
}

export default function NewPostBox({ onCreateTask }: NewPostBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    deadline: "",
    instructor: "",
    status: "PENDING" as TaskStatus,
    priority: "NORMAL" as TaskPriority,
    course: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.code) return;
    onCreateTask(formData);
    setFormData({
      code: "",
      title: "",
      deadline: "",
      instructor: "",
      status: "PENDING",
      priority: "NORMAL",
      course: "",
      description: "",
    });
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-4 bg-white border border-outline/30 border-dashed px-6 py-4 text-on-surface-variant hover:border-primary hover:text-primary transition-all group"
      >
        <span className="material-symbols-outlined group-hover:scale-110 transition-transform" aria-hidden="true">
          add_circle
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          New Task Entry
        </span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-primary p-6 animate-fade-in"
    >
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-primary mb-6 font-bold">
        New Task Entry
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Course Code *
          </label>
          <input
            required
            value={formData.code}
            onChange={(e) =>
              setFormData((p) => ({ ...p, code: e.target.value }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary uppercase bg-slate-50"
            placeholder="ARCH101"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Course Name
          </label>
          <input
            value={formData.course}
            onChange={(e) =>
              setFormData((p) => ({ ...p, course: e.target.value }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary bg-slate-50"
            placeholder="Foundations of Architecture"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Task Title *
        </label>
        <input
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
          className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary bg-slate-50"
          placeholder="Spatial Dynamics in Urban Design"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Deadline
          </label>
          <input
            value={formData.deadline}
            onChange={(e) =>
              setFormData((p) => ({ ...p, deadline: e.target.value }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary uppercase bg-slate-50"
            placeholder="OCT 24, 2023"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Instructor
          </label>
          <input
            value={formData.instructor}
            onChange={(e) =>
              setFormData((p) => ({ ...p, instructor: e.target.value }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary bg-slate-50"
            placeholder="Dr. James Mitchell"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                status: e.target.value as TaskStatus,
              }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary bg-slate-50"
          >
            <option value="PENDING">Pending</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="COMPLETED">Completed</option>
            <option value="REVISED">Revised</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                priority: e.target.value as TaskPriority,
              }))
            }
            className="w-full border border-outline/40 px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary bg-slate-50"
          >
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary text-on-primary px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
        >
          Create Task
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="border border-outline px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
