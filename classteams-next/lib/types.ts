// ===== TASK / ASSIGNMENT TYPES =====

export type TaskStatus = "PENDING" | "SUBMITTED" | "COMPLETED" | "REVISED";
export type TaskPriority = "CRITICAL" | "HIGH" | "NORMAL";

export interface Task {
  id: string; // ✅ Supabase pakai UUID (string)
  title: string;
  description: string;
  status: TaskStatus;

  // optional (biar design lama tetap jalan)
  code?: string;
  deadline?: string;
  instructor?: string;
  priority?: TaskPriority;
  course?: string;
}

// ===== NAVIGATION TYPES =====

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  page: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "dashboard", page: "dashboard" },
  {
    label: "Assignments",
    href: "/assignments",
    icon: "assignment",
    page: "assignments",
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: "calendar_today",
    page: "schedule",
  },
  {
    label: "Resources",
    href: "/resources",
    icon: "folder",
    page: "resources",
  },
];

export const SETTINGS_NAV: NavItem = {
  label: "Settings",
  href: "/settings",
  icon: "settings",
  page: "settings",
};

// ===== HELPER FUNCTIONS =====

export function getStatusColorClasses(status: TaskStatus): string {
  const colors: Record<TaskStatus, string> = {
    PENDING: "text-primary border-primary",
    SUBMITTED: "text-slate-400 border-outline",
    COMPLETED: "text-green-600 border-green-600",
    REVISED: "text-yellow-600 border-yellow-600",
  };
  return colors[status] ?? "text-slate-400 border-outline";
}

export function getPriorityColorClasses(priority: TaskPriority): string {
  const colors: Record<TaskPriority, string> = {
    CRITICAL: "text-error",
    HIGH: "text-yellow-600",
    NORMAL: "text-slate-600",
  };
  return colors[priority] ?? "text-slate-600";
}