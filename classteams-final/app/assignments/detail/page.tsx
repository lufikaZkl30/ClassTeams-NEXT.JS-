'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import {
  getTasks,
  initializeTasks,
  saveTasks,
  getTaskById,
  getFileIcon,
  Task,
} from '../../lib/tasks';

function DetailTeksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = parseInt(searchParams.get('id') || '0');

  const [task, setTask] = useState<Task | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function reloadTask() {
    initializeTasks();
    const found = getTaskById(taskId);
    setTask(found || null);
  }

  useEffect(() => {
    reloadTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setUploadProgress(0);
    setUploading(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploading(false);
      }
      setUploadProgress(Math.round(progress));
    }, 400);
  }

  function submitUpload() {
    if (!selectedFile || uploadProgress < 100 || !task) return;
    const tasks = getTasks();
    const t = tasks.find(x => x.id === taskId);
    if (t) {
      if (!t.attachments) t.attachments = [];
      t.attachments.push({
        name: selectedFile.name.toUpperCase(),
        size: (Math.random() * 50).toFixed(1) + ' MB',
        uploadedAt: new Date().toLocaleString('id-ID'),
      });
      saveTasks(tasks);
      alert('File berhasil diupload!');
      reloadTask();
      closeModal();
    }
  }

  function openModal() {
    setUploadModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setUploadModalOpen(false);
    setSelectedFile(null);
    setUploadProgress(0);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    document.body.style.overflow = 'auto';
  }

  function requestExtension() {
    const reason = prompt('Berikan alasan untuk meminta perpanjangan:');
    if (reason) alert('Permintaan perpanjangan dikirim: ' + reason);
  }

  const deadlineParts = task?.deadline?.split(', ') || [];
  const deadlineDisplay = deadlineParts[0] || 'TBD';

  if (!task && taskId) {
    return (
      <div className="bg-background text-on-background min-h-screen flex">
        <Sidebar />
        <main className="flex-grow ml-64 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">assignment_late</span>
          <p className="text-slate-500 font-mono uppercase text-sm tracking-wider">Task not found</p>
          <Link href="/assignments" className="mt-6 text-primary font-bold text-sm hover:underline">
            ← Back to Assignments
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />

      <main className="flex-grow ml-64 flex flex-col min-h-screen">
        <TopBar searchPlaceholder="SEARCH ENTITIES..." />

        <section className="p-12 flex-grow bg-background">
          <div className="max-w-6xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm flex-wrap">
                <li><Link href="/" className="text-primary hover:text-blue-700 font-semibold transition-colors">Dashboard</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li><Link href="/assignments" className="text-primary hover:text-blue-700 font-semibold transition-colors">Assignments</Link></li>
                <li className="text-on-surface-variant">/</li>
                <li className="text-on-surface-variant font-semibold truncate max-w-xs">{task?.title || 'Assignment Detail'}</li>
              </ol>
            </nav>

            {/* Back Button */}
            <button
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8"
              onClick={() => router.back()}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to ledger</span>
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">

              {/* Main Column */}
              <div className="col-span-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                  Task Category: {task?.code || '—'}
                </span>

                <h1 className="text-5xl font-extrabold tracking-tighter mb-8 leading-none text-on-background uppercase">
                  {task?.title || 'Loading...'}
                </h1>

                <div className="text-on-surface-variant leading-relaxed mb-12">
                  <p className="mb-6 text-base">
                    {task?.description || 'No description available.'}
                  </p>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Attachments</span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {(!task?.attachments || task.attachments.length === 0) ? (
                      <div className="col-span-2 bg-surface-container p-6 text-center border border-outline">
                        <p className="text-sm text-on-surface-variant font-mono uppercase text-[10px] tracking-wider">No attachments yet</p>
                      </div>
                    ) : (
                      task.attachments.map((file, i) => (
                        <div
                          key={i}
                          className="bg-white border border-outline-variant p-6 flex items-center justify-between group cursor-pointer hover:border-primary transition-colors"
                          onClick={() => alert('Downloading: ' + file.name)}
                        >
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary">{getFileIcon(file.name)}</span>
                            <div>
                              <p className="text-sm font-bold tracking-tight text-on-surface">{file.name}</p>
                              <p className="text-[10px] text-on-surface-variant uppercase font-mono">{file.size}</p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">download</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="col-span-4 space-y-12">

                {/* Deadline */}
                <div className="bg-primary-container p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container mb-6 block">
                    Deadline Information
                  </span>
                  <div className="flex items-end gap-2 mb-2 text-on-primary-container">
                    <span className="text-4xl font-extrabold tracking-tighter">{deadlineDisplay}</span>
                    <span className="text-lg font-bold opacity-60 pb-1">/ 2024</span>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-tighter mb-8 text-on-primary-container opacity-80">
                    submission window closes at 23:59 GMT
                  </p>
                  <div className="space-y-4">
                    <button
                      className="w-full bg-primary text-on-primary p-4 text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                      onClick={openModal}
                    >
                      Upload Assignment
                    </button>
                    <button
                      className="w-full border border-on-primary-container text-on-primary-container p-4 text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                      onClick={requestExtension}
                    >
                      Request Extension
                    </button>
                  </div>
                </div>

                {/* Facilitator */}
                <div className="border-l-4 border-primary pl-8 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">
                    Assigned Facilitator
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt="Portrait of Professor"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3aZl2OwrjO9CD55dDp0YuBuDbIizgVf0B0rSshow4014weevFrX7W8IK34hCL7-__GHxAqsJWjZREa79QxZuF8osDJR2ztHySVH9U92s6cU36otq7OJ3gCxNOn52SHdemPf9UvN5HKDjQrFDhC20ynZcN_4pOjH6Km85GTQZ1mjUdOo7S0oG-tJZSK0Zq89RviB86cRWbqDmAdzFdKU8kovuH6d0Df_44YrR-mr26KWyw5U6D1VpzBjVXxy9QoQfxq07gzOHNgCy"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight text-on-surface">{task?.instructor?.toUpperCase() || 'DR. ELIAS VANCE'}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase font-mono">Structural Engineering Dept.</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-white border border-outline-variant p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">
                    System Status
                  </span>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${task?.status === 'SUBMITTED' || task?.status === 'COMPLETED' ? 'bg-green-500' : 'bg-primary'}`}></div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                      {task?.status || 'Pending Submission'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white w-full max-w-4xl my-8 mx-4 relative">
            {/* Modal Header */}
            <header className="bg-white border-b border-outline-variant flex items-center justify-between px-8 py-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary">Assignment Portal</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-on-background">Upload Assignment</h2>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors" onClick={closeModal} aria-label="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Upload Area */}
                <div className="col-span-8 flex flex-col gap-6">
                  <div
                    className="border-2 border-dashed border-outline-variant bg-primary-container p-16 flex flex-col items-center justify-center text-center gap-4 hover:bg-surface-container-high transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-4xl text-primary">upload_file</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-medium text-on-background">Drag and drop your files here</p>
                      <p className="text-sm text-on-surface-variant">PDF, DOCX, or ZIP files up to 50MB</p>
                    </div>
                    <button
                      className="mt-4 bg-white border border-primary text-primary px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    >
                      Choose File
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.zip"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {selectedFile && (
                    <div className="flex flex-col gap-4 bg-surface-container-high p-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-tighter text-on-surface-variant block">Current Queue</span>
                          <p className="text-sm font-bold text-on-background">{selectedFile.name}</p>
                        </div>
                        <span className="text-xs font-mono text-primary font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-highest">
                        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="col-span-4 flex flex-col gap-6">
                  <div className="bg-white border border-outline-variant p-6 flex flex-col gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-on-background">Metadata</h3>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest uppercase mb-1 block text-on-surface-variant">Course ID</label>
                      <p className="text-sm font-medium text-on-background">{task?.code || 'ARC-402-2024'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest uppercase mb-1 block text-on-surface-variant">Due Date</label>
                      <p className="text-sm font-medium text-on-background">{task?.deadline || 'TBD'}</p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-primary text-on-primary py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={submitUpload}
                    disabled={!selectedFile || uploadProgress < 100 || uploading}
                  >
                    {uploading ? 'Uploading...' : 'Submit Upload'}
                  </button>

                  <div className="flex items-start gap-3 p-4 bg-tertiary border-l-4 border-primary">
                    <span className="material-symbols-outlined text-error text-sm mt-0.5">info</span>
                    <p className="text-[10px] font-medium leading-relaxed text-error">
                      By uploading this file, you confirm that this work is your own and adheres to the academic integrity ledger of ClassTeams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DetailTeksPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-slate-300 animate-pulse block mb-4">hourglass_empty</span>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <DetailTeksContent />
    </Suspense>
  );
}
