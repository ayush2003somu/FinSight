import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { navItems } from "../config/navItems";
import NavBar from "./NavBar";
function BottomNav() {
  const { currentPage, setCurrentPage } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center 
    bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-2 lg:hidden">

      {navItems.map(({ name, key,icon:Icon }) => {
        const isActive = key === currentPage;

        return (
          <button
            key={key}
            onClick={() => setCurrentPage(key)}
            className={`flex flex-col items-center text-xs transition ${
              isActive ? "text-purple-600" : "text-slate-400"
            }`}
          >
            <Icon size={20} />
            <span>{name}</span>
          </button>
        );
      })}
    </div>
  );
}
export default BottomNav;