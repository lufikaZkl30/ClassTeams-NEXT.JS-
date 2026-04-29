"use client";

interface HeaderProps {
  searchPlaceholder?: string;
}

export default function Header({
  searchPlaceholder = "SEARCH...",
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 w-full bg-white border-b border-outline/30 sticky top-0 z-40">
      <div className="flex items-center gap-12">
        <h1 className="text-xl font-bold tracking-tighter text-primary">
          ClassTeams
        </h1>
        <form className="relative w-64" role="search">
          <label htmlFor="search-input" className="sr-only">
            {searchPlaceholder}
          </label>
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            id="search-input"
            className="w-full bg-slate-50 border border-outline/40 px-10 py-2 text-[10px] font-mono focus:outline-none focus:border-primary uppercase tracking-wider transition-colors"
            placeholder={searchPlaceholder}
            type="text"
          />
        </form>
      </div>

      <nav aria-label="User actions" className="flex items-center gap-6">
        <button
          className="text-slate-500 hover:text-primary transition-colors duration-150"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            notifications
          </span>
        </button>
        <button
          className="text-slate-500 hover:text-primary transition-colors duration-150"
          aria-label="User profile"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            account_circle
          </span>
        </button>
      </nav>
    </header>
  );
}
