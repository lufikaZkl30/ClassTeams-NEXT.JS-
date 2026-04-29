// ── Navigation ─────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  page: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",   href: "/",           icon: "dashboard",     page: "dashboard" },
  { label: "Assignments", href: "/assignments", icon: "assignment",    page: "assignments" },
  { label: "Schedule",    href: "/schedule",    icon: "calendar_today", page: "schedule" },
  { label: "Resources",   href: "/resources",   icon: "folder",        page: "resources" },
];

export const SETTINGS_NAV: NavItem = {
  label: "Settings", href: "/settings", icon: "settings", page: "settings",
};

// ── Task / Assignment ──────────────────────────────────

export type TaskStatus   = "PENDING" | "SUBMITTED" | "COMPLETED" | "REVISED";
export type TaskPriority = "CRITICAL" | "HIGH" | "NORMAL";

export interface Task {
  id: number;
  code: string;
  title: string;
  deadline: string;
  instructor: string;
  status: TaskStatus;
  priority: TaskPriority;
  course: string;
  description: string;
}

export const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    code: "ARCH101",
    title: "Spatial Dynamics in Urban Design",
    deadline: "OCT 24, 2023",
    instructor: "Dr. James Mitchell",
    status: "PENDING",
    priority: "NORMAL",
    course: "Foundations of Architecture",
    description: "Analyze spatial dynamics and urban design principles in contemporary architecture.",
  },
  {
    id: 2,
    code: "DMS204",
    title: "Interactivity & Visual Hierarchy",
    deadline: "OCT 20, 2023",
    instructor: "Prof. Sarah Chen",
    status: "SUBMITTED",
    priority: "NORMAL",
    course: "Digital Media Studio",
    description: "Create interactive digital media layouts with proper visual hierarchy.",
  },
  {
    id: 3,
    code: "VIS102",
    title: "Typography & Typeface History",
    deadline: "NOV 02, 2023",
    instructor: "Dr. Michael Ross",
    status: "PENDING",
    priority: "CRITICAL",
    course: "Visual Communications",
    description: "Comprehensive study of typography history and contemporary typeface design.",
  },
];

// ── Helpers ────────────────────────────────────────────

export function statusClasses(s: TaskStatus): string {
  return {
    PENDING:   "text-primary border-primary",
    SUBMITTED: "text-slate-400 border-outline",
    COMPLETED: "text-green-600 border-green-600",
    REVISED:   "text-yellow-600 border-yellow-600",
  }[s] ?? "text-slate-400 border-outline";
}

export function priorityClasses(p: TaskPriority): string {
  return {
    CRITICAL: "text-error",
    HIGH:     "text-yellow-600",
    NORMAL:   "text-slate-600",
  }[p] ?? "text-slate-600";
}
