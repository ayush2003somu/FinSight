import { useContext } from "react";
import { LayoutDashboard } from "lucide-react";
import { AppContext } from "../context/AppContext"; 

const navItems = ["Dashboard", "Transactions", "Insights"];
function SideBar() {
  const { currentPage, setCurrentPage } = useContext(AppContext);
  return (
    <aside className={`hidden md:block w-64 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transform transition-transform duration-300 z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 `}>
      <div className="p-8">
        <div className="mb-10 flex items-center gap-3 text-slate-900 dark:text-slate-100">
          <LayoutDashboard className="text-slate-400 dark:text-slate-500" size={20} />
          <span className="text-2xl font-bold tracking-tight">FinSight</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            console.log(item.toLowerCase());
            const isActive = item.toLowerCase() === currentPage;
            return (
              <button
                key={item}
                type="button"
                onClick={()=>{
                setCurrentPage(item.toLowerCase());
                }}
                className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-slate-100 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
