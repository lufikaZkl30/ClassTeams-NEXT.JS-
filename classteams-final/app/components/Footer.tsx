export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-8 py-6 w-full mt-auto bg-white border-t border-outline border-opacity-30">
      <p className="text-[10px] font-mono uppercase tracking-tighter text-slate-500">
        © 2026 CLASSTEAMS ACADEMIC CLARITY SYSTEM
      </p>
      <nav aria-label="Footer links" className="flex gap-8">
        <a className="text-[10px] font-mono uppercase tracking-tighter text-slate-400 hover:text-primary transition-opacity" href="#">Privacy</a>
        <a className="text-[10px] font-mono uppercase tracking-tighter text-slate-400 hover:text-primary transition-opacity" href="#">Terms</a>
        <a className="text-[10px] font-mono uppercase tracking-tighter text-primary hover:underline transition-opacity font-bold" href="#">Support</a>
      </nav>
    </footer>
  );
}
