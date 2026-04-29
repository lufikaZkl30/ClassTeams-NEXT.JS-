export default function PageFooter() {
  return (
    <footer className="flex justify-between items-center px-8 py-6 w-full mt-auto bg-white border-t border-outline/30 text-on-surface-variant text-[10px] font-mono uppercase tracking-tighter">
      <div className="opacity-60">© 2026 ClassTeams Academic System</div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
        <a href="#" className="hover:text-primary transition-colors">Support</a>
      </div>
    </footer>
  );
}
