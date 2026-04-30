'use client';

interface TopBarProps {
  searchPlaceholder?: string;
}

export default function TopBar({ searchPlaceholder = 'SEARCH...' }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 w-full bg-white border-b border-outline border-opacity-30 sticky top-0 z-40">
      <hgroup className="flex items-center gap-12">
        <h1 className="text-xl font-bold tracking-tighter text-primary">ClassTeams</h1>
        <form className="relative w-64" role="search">
          <label htmlFor="search-input" className="sr-only">Search</label>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">search</span>
          <input
            id="search-input"
            className="w-full bg-slate-50 border border-outline-variant px-10 py-2 text-[10px] font-mono focus:outline-none focus:border-primary uppercase tracking-wider"
            placeholder={searchPlaceholder}
            type="text"
          />
        </form>
      </hgroup>

      <nav aria-label="User actions" className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-primary transition-colors duration-150" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-slate-500 hover:text-primary transition-colors duration-150" aria-label="User profile">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </nav>
    </header>
  );
}
