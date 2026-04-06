import { useContext } from "react";
import { LayoutDashboard } from "lucide-react";
import { AppContext } from "../context/AppContext"; 
import { navItems } from "../config/navItems";
import lightlogo from "../media/logo1.png"
import darklogo from "../media/logo2.png"
function SideBar() {
  const { currentPage, setCurrentPage,isDark} = useContext(AppContext);
  return (
<aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
  <div className="p-8">
    <div className="mb-10 flex items-center gap-2">
      {isDark?<img src={darklogo} alt="logo" height={25} width={25} />:
      <img src={lightlogo} alt="logo" height={25} width={25} />}
      <span className="text-2xl font-bold dark:text-slate-100">FinSight</span>
    </div>

    <nav>
      {navItems.map(({ name, key, icon: Icon }) => {
        const isActive = key === currentPage;

        return (
          <button
            key={key}
            onClick={() => setCurrentPage(key)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-slate-100 dark:bg-slate-800 dark:text-slate-100"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {Icon && <Icon size={18} />}
            {name}
          </button>
        );
      })}
    </nav>
  </div>
</aside>
  );
}

export default SideBar;
