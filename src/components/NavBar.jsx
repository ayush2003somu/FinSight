import { useContext } from "react";
import { Moon, Sun, Wallet, ChevronsUpDown } from "lucide-react";
import { AppContext } from "../context/AppContext";
import lightlogo from "../media/logo1.png"
import darklogo from "../media/logo2.png"

const periodOptions = ["1M", "3M", "6M"];

function NavBar() {
  const { isDark, toggleDark, setPeriod, selectedPeriod, currentPage, admin,setAdminRole} = useContext(AppContext);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-8">
    <h1 className="flex gap-2 items-center text-sm md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 ">
             {isDark?<img src={darklogo} alt="logo"className="lg:hidden" height={25} width={25} />:<img src={lightlogo} alt="logo" className="lg:hidden" height={25} width={25} />}
              <span className="hidden md:inline">Financial Overview</span>
      </h1>
      <div className="flex justify-between items-center gap-4">
        {
        currentPage!=="transactions"?
        <div className="flex justify-between w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {periodOptions.map((option) => {
              const isActive = selectedPeriod === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPeriod(option)}
                  className={`rounded-lg px-2 py-1  md:text-sm md:px-3 md:py-1
                    text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {option}
                </button>
              );
            })}
        </div>:
            <div className="flex items-center gap-2">
            <button
            value={admin?'admin':'viewer'}
            onClick={() => setAdminRole(!admin)}
            className={`text-sm p-2 px-3 rounded-xl  ${admin?'text-blue-600 dark:text-slate-800 dark:bg-blue-400 dark:hover:text-slate-100':'text-slate-600 dark:text-slate-400 hover:text-gray-600'} 
            border border-slate-200 bg-white outline-none cursor-pointer
            dark:bg-slate-800 dark:border-slate-700 hover:bg-gray-100  dark:hover:bg-slate-700`}
            ><div className="flex items-center gap-1">{admin?'Admin':'Viewer'}<ChevronsUpDown size={15}/></div>
            </button>
         </div>
}
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleDark}
          className="rounded-lg border border-slate-200 p-2 text-slate-400 transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 align-right ml-auto"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default NavBar;
