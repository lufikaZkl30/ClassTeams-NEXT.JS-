export interface Task {
  id: number;
  code: string;
  title: string;
  deadline: string;
  instructor: string;
  status: 'PENDING' | 'SUBMITTED' | 'COMPLETED' | 'REVISED';
  priority?: 'CRITICAL' | 'HIGH' | 'NORMAL';
  course: string;
  description: string;
  attachments?: { name: string; size: string; uploadedAt: string }[];
}

const STORAGE_KEY = 'classteams_tasks';

const defaultTasks: Task[] = [
  {
    id: 1,
    code: 'ARCH101',
    title: 'Spatial Dynamics in Urban Design',
    deadline: 'OCT 24, 2023',
    instructor: 'Dr. James Mitchell',
    status: 'PENDING',
    priority: 'NORMAL',
    course: 'Foundations of Architecture',
    description: 'Analyze spatial dynamics and their impact on urban design principles.',
    attachments: [
      { name: 'SPATIAL_ANALYSIS.PDF', size: '2.5 MB', uploadedAt: '2023-10-15' },
      { name: 'DESIGN_MOCKUP.PNG', size: '5.8 MB', uploadedAt: '2023-10-15' },
    ],
  },
  {
    id: 2,
    code: 'DMS204',
    title: 'Interactivity & Visual Hierarchy',
    deadline: 'OCT 20, 2023',
    instructor: 'Prof. Sarah Chen',
    status: 'SUBMITTED',
    priority: 'NORMAL',
    course: 'Digital Media Studio',
    description: 'Create interactive digital experiences with proper visual hierarchy.',
    attachments: [
      { name: 'INTERACTIVE_PROTOTYPE.ZIP', size: '12.3 MB', uploadedAt: '2023-10-18' },
    ],
  },
  {
    id: 3,
    code: 'VIS102',
    title: 'Typography & Typeface History',
    deadline: 'NOV 02, 2023',
    instructor: 'Dr. Michael Ross',
    status: 'PENDING',
    priority: 'CRITICAL',
    course: 'Visual Communications',
    description: 'Comprehensive study of typography history and contemporary typeface design.',
    attachments: [],
  },
  {
    id: 4,
    code: 'ARCH201',
    title: 'The Impact of Cantilever Systems on Urban Brutalism',
    deadline: 'OCT 24, 2024',
    instructor: 'Dr. Elias Vance',
    status: 'PENDING',
    priority: 'NORMAL',
    course: 'Advanced Architecture',
    description:
      'This task requires a comprehensive structural breakdown of the central cantilever mechanisms used in the secondary wing of the Academic Ledger complex. Students must analyze the load-bearing requirements and provide a detailed blueprint revision including material stress tests. Final submissions must be rendered in grayscale architectural format, adhering to the 0px radius mandate of the structural ledger system. Late submissions will be flagged in the audit system.',
    attachments: [
      { name: 'STRUCTURAL_SPEC_V2.PDF', size: '2.5 MB', uploadedAt: '2024-10-15' },
      { name: 'SITE_MAP_RENDER.PNG', size: '8.2 MB', uploadedAt: '2024-10-15' },
    ],
  },
];

export function initializeTasks(): void {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
  }
}

export function getTasks(): Task[] {
  if (typeof window === 'undefined') return defaultTasks;
  initializeTasks();
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getTaskById(id: number): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function createTask(task: Omit<Task, 'id'>): void {
  const tasks = getTasks();
  const newTask: Task = {
  id: Date.now(),
  attachments: [],
  ...task,
};  tasks.push(newTask);
  saveTasks(tasks);
}

export function updateTask(id: number, updated: Partial<Task>): void {
  const tasks = getTasks().map((t) => (t.id === id ? { ...t, ...updated } : t));
  saveTasks(tasks);
}

export function deleteTask(id: number): void {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'text-primary border-primary',
    SUBMITTED: 'text-slate-400 border-outline',
    COMPLETED: 'text-green-600 border-green-600',
    REVISED: 'text-yellow-600 border-yellow-600',
  };
  return colors[status] || 'text-slate-400 border-outline';
}

export function getPriorityColor(priority?: string): string {
  const colors: Record<string, string> = {
    CRITICAL: 'text-error',
    HIGH: 'text-yellow-600',
    NORMAL: 'text-slate-600',
  };
  return colors[priority || 'NORMAL'] || 'text-slate-600';
}

export function getFileIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const iconMap: Record<string, string> = {
    pdf: 'description', doc: 'description', docx: 'description', txt: 'description',
    zip: 'folder_zip', png: 'image', jpg: 'image', jpeg: 'image', gif: 'image',
  };
  return iconMap[ext] || 'description';
}
