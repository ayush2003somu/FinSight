import { Settings,User } from "lucide-react";
{/* Navbar with "Real" Profile placeholder */}
    function NavBar(){
    return(
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-200 px-8 flex items-center justify-between z-10">
          {/* <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">Menu</button> */}
          <div className="flex items-center gap-6 ml-auto">
            <Settings className="text-slate-400 cursor-pointer hover:text-slate-600" size={20} />
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm">
              <User size={20} className="text-slate-500" />
            </div>
          </div>
        </header>
    )}
export default NavBar;