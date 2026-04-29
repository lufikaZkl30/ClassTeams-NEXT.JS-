"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Attachment = {
  name: string;
  size: string;
  uploadedAt: string;
};

type Task = {
  id: number;
  title: string;
  code: string;
  deadline: string;
  status: string;
  instructor: string;
  description: string;
  attachments: Attachment[];
};

const STORAGE_KEY = "classteams_tasks";

export default function DetailTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  // INIT DATA
  useEffect(() => {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (tasks.length === 0) {
      tasks = [
        {
          id: 1,
          title: "Cantilever Systems Analysis",
          code: "ARCH201",
          deadline: "OCT 24, 2024",
          status: "Pending",
          instructor: "Dr. Elias Vance",
          description:
            "Detailed structural breakdown of cantilever systems.",
          attachments: [],
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    const found = tasks.find((t: Task) => t.id === Number(id));
    setTask(found);
  }, [id]);

  const goBack = () => router.back();

  // HANDLE FILE
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(p);
    }, 300);
  };

  // UPLOAD
  const submitUpload = () => {
    if (!task || progress < 100) return;

    const newFile = {
      name: fileName,
      size: "3.2 MB",
      uploadedAt: new Date().toLocaleString(),
    };

    const tasks: Task[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const updated = tasks.map((t) =>
      t.id === task.id
        ? { ...t, attachments: [...t.attachments, newFile] }
        : t
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTask({ ...task, attachments: [...task.attachments, newFile] });

    setShowModal(false);
    setFileName("");
    setProgress(0);
  };

  if (!task) return <div className="p-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 fixed h-full">
        <h1 className="text-xl font-bold text-blue-600 mb-8">ClassTeams</h1>

        <nav className="flex flex-col gap-3">
          <button onClick={() => router.push("/")} className="text-left">
            Dashboard
          </button>
          <button className="text-left font-bold text-blue-600">
            Assignments
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-64 p-10">

        {/* TOPBAR */}
        <div className="flex justify-between mb-10">
          <h1 className="text-xl font-bold text-blue-600">ClassTeams</h1>
          <input
            placeholder="Search..."
            className="border px-4 py-2 text-sm"
          />
        </div>

        {/* BACK */}
        <button onClick={goBack} className="mb-6 text-sm text-gray-500">
          ← Back to Ledger
        </button>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="col-span-8">

            <p className="text-xs uppercase text-blue-600 mb-2">
              {task.code}
            </p>

            <h1 className="text-5xl font-extrabold mb-6">
              {task.title}
            </h1>

            <p className="text-gray-600 mb-10">
              {task.description}
            </p>

            {/* ATTACHMENTS */}
            <h3 className="text-xs uppercase mb-3">Attachments</h3>

            <div className="grid grid-cols-2 gap-4">
              {task.attachments.map((file, i) => (
                <div key={i} className="p-4 border bg-white flex justify-between">
                  <div>
                    <p className="font-bold text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                  <span>⬇</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-6">

            {/* DEADLINE */}
            <div className="bg-blue-100 p-6">
              <h3 className="text-xs uppercase mb-3">Deadline</h3>
              <p className="text-3xl font-bold">{task.deadline}</p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-6 w-full bg-blue-600 text-white py-3"
              >
                Upload Assignment
              </button>
            </div>

            {/* INSTRUCTOR */}
            <div className="p-6 border bg-white">
              <h3 className="text-xs uppercase mb-2">Instructor</h3>
              <p className="font-bold">{task.instructor}</p>
            </div>

            {/* STATUS */}
            <div className="p-6 border bg-white">
              <h3 className="text-xs uppercase mb-2">Status</h3>
              <p>{task.status}</p>
            </div>

          </div>

        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[600px] p-8">

            <h2 className="text-2xl font-bold mb-6">
              Upload Assignment
            </h2>

            {/* INPUT */}
            <input type="file" onChange={handleFile} />

            {/* PROGRESS */}
            {fileName && (
              <div className="mt-6">
                <p className="text-sm">{fileName}</p>
                <div className="w-full h-2 bg-gray-200 mt-2">
                  <div
                    className="h-2 bg-blue-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs mt-1">{progress}%</p>
              </div>
            )}

            {/* ACTION */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={submitUpload}
                className="bg-blue-600 text-white px-4 py-2"
                disabled={progress < 100}
              >
                Upload
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}