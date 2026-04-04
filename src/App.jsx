import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppProvider";
import Transactions from './pages/Transactions';
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
function App() {
  const {currentPage} = useContext(AppContext);
  return (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-6">
    <div className="mx-auto max-w-[1400px] flex rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <NavBar />
      {currentPage==='dashboard'?
      <Dashboard />:<Transactions/>}
      </main>
    </div>
  </div>
  );
}

export default App;