import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TransactionsTable from '../components/TransactionsTable';
import { MCC_MAP } from '../data/mockData';
// import AddTransactionModal from '../components/AddTransactionModal';

export default function Transactions() {
  const { transactions, role } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

//   const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  let result = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );
const allCategories = ['all', ...new Set(
  transactions.map(t => MCC_MAP[t.mcc] || 'Other')
)];
if (categoryFilter !== 'all') {
  result = result.filter(t => (MCC_MAP[t.mcc] || 'Other') === categoryFilter);
}
if (dateFrom) {
  result = result.filter(t => new Date(t.date) >= new Date(dateFrom));
}
if (dateTo) {
  result = result.filter(t => new Date(t.date) <= new Date(dateTo));
}
const totalIn  = result.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const totalOut = result.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">All Transactions</h2>
          <p className="text-xs text-slate-400 mt-0.5">{result.length} transactions found</p>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200
                       rounded-xl px-4 py-2 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-white border border-slate-200 rounded-xl p-3 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Showing</p>
          <p className="text-base font-semibold mt-0.5 text-slate-800 dark:text-white">{result.length} txns</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Total in</p>
          <p className="text-base font-semibold mt-0.5 text-emerald-600">₹{totalIn.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Total out</p>
          <p className="text-base font-semibold mt-0.5 text-rose-500">₹{totalOut.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-3 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Net</p>
          <p className="text-base font-semibold mt-0.5 text-slate-800 dark:text-white">₹{(totalIn - totalOut).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] h-9 px-3 text-sm rounded-xl border border-slate-200
                     bg-white placeholder-slate-400 outline-none focus:border-blue-300
                     dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
        />
        <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-600
             outline-none cursor-pointer
             dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
            {allCategories.map(cat => (
            <option key={cat} value={cat}>
            {cat === 'all' ? 'All categories' : cat}
            </option>
            ))}
            </select>
            <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-600
                        outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            />
            <span className="text-xs text-slate-400">to</span>
            <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-600
                        outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            />
            {(categoryFilter !== 'all' || dateFrom || dateTo) && (
            <button
                onClick={() => {
                setCategoryFilter('all');
                setDateFrom('');
                setDateTo('');
                }}
                className="h-9 px-3 text-xs rounded-xl border border-slate-200 text-rose-400
                        hover:bg-rose-50 dark:border-slate-700"
            >
                Clear ✕
            </button>
            )}
      </div>
      <TransactionsTable transactions={result} />

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}