import { LayoutDashboard } from "lucide-react";
function SideBar(){
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isSidebarOpen = true;
    return(
    <aside className={`bg-white w-72 border-r border-slate-200 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-8">
          <div className="flex items-center gap-2 text-blue-600 mb-10">
            <LayoutDashboard size={28} />
            <span className="text-2xl font-black tracking-tight">FinTrack</span>
          </div>

          <nav className="space-y-1">
            {['Dashboard', 'Transactions', 'Insights', 'Budgets'].map((item) => (
              <button 
                key={item}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  item === 'Dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      )}
export default SideBar;