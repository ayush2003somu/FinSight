import { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { AppContext } from "../context/AppContext";

const periodOptions = ["1M", "3M", "6M"];

function NavBar() {
  const { isDark, toggleDark, setPeriod, selectedPeriod } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
        <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2"
        >
        ☰
        </button>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Financial Overview
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {periodOptions.map((option) => {
              const isActive = selectedPeriod === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPeriod(option)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {option}
                </button>
              );
            })}
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          Export CSV
        </button>

        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleDark}
          className="rounded-lg border border-slate-200 p-2 text-slate-400 transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default NavBar;
