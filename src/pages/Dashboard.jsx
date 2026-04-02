import  { useContext } from 'react';
import { AppContext } from "../context/appContext";
import StatCard from "../components/StatCard";
import TransactionsTable from '../components/TransactionsTable';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

export default function FinTrackDashboard() {
const { transactions, filter,sortBy,order } = useContext(AppContext);
const income = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);
const expenses = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);
const savingScore = income === 0 ? 0 : ((income - expenses) / income) * 100;// console.log(savingsRate);

// For Filtering Data
const filteredTransactions =
  filter === "all"
    ? transactions
    : transactions.filter((t) => t.type === filter);
    
// Sorting Data
const sortedTransactions = [...filteredTransactions].sort((a, b) => {
  if (sortBy === "amount") {
    return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
  } else if (sortBy === "date") {
    return order === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  }
  return 0;
});
  return (
    //bg-  #f8fafc
    
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Sidebar with dynamic active states */}
      <SideBar/>
      <main className="flex-1 overflow-y-auto">
              <NavBar/>
        <div className="p-8 max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here is what's happening with your money.</p>
          </header>

        {/* Grid using the sub-component */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Balance" value={income - expenses} />
            <StatCard title="Income" value={income} type="income" />
            <StatCard title="Expenses" value={expenses} type="expense" />
            <StatCard
                title="Saving Score"
                value={`${ Math.min(Math.round(savingScore))}/100`}
                type="score"
                saving = {savingScore}
            />
        </section>
        <TransactionsTable transactions={sortedTransactions}/>
        </div>
      </main>
    </div>
  );
}