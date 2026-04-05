import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TransactionsTable from '../components/TransactionsTable';
import { MCC_MAP } from '../data/mockData';
import { Download } from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModel';

export default function Transactions() {
  const { transactions, admin, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
    // for Exporting CSV
    function handleExportCSV() {
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];

    const rows = result.map(t => [
    t.date,
    t.description,
    MCC_MAP[t.mcc] || 'Other',
    t.amount,
    t.type
  ]);

const csvContent = [
    headers,
    ...rows,
    [],
    ['Total In', '', '', totalIn, 'income'],
    ['Total Out', '', '', totalOut, 'expense']
]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
    a.click();

  URL.revokeObjectURL(url); // cleanup
}

function handleOpenAddModal() {
    setEditingTransaction(null);
    setShowModal(true);
  }

function handleOpenEditModal(transaction) {
    setEditingTransaction(transaction);
    setShowModal(true);
  }

function handleCloseModal() {
    setEditingTransaction(null);
    setShowModal(false);
  }

  function handleDeleteTransaction(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

   return (
    <div className="p-6">

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">All Transactions</h2>
          <p className="text-sm text-slate-400 mt-0.5">{result.length} transactions found</p>
        </div>
        {admin && (
          <button
            onClick={handleOpenAddModal}
            className="text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200
                       rounded-xl px-4 py-2 md:px-4 md:py-2 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:bg-blue-900 dark:hover:text-white"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* summary strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
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

      <div className="flex flex-wrap justify-evenly gap-2 ">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] h-9 px-3 text-sm rounded-xl border border-slate-200
                     bg-white placeholder-slate-400 outline-none focus:border-blue-300
                     dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
        />
        <div className='flex  gap-2 items-start mr-auto'>
        <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-600
             outline-none cursor-pointer
             dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
            {allCategories.map(cat => (
            <option key={cat} value={cat}>
            {cat === 'all' ? 'All categories' : cat}
            </option>
            ))}
            </select>

        <button
            type="button"
            onClick={handleExportCSV}
            className="rounded-xl border border-slate-200 px-4 py-2  text-sm font-medium text-slate-500 transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
            <div className='flex gap-2'>
            <Download size={18} />
            <span className="hidden md:inline">
            Export CSV
            </span>
            </div>
        </button>
            </div>
        <div className='flex items-center flex-col gap-2'>
            <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="h-9 px-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-600
                        outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            />
            <span className="text-sm text-slate-400">To</span>
            <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="h-9 px-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-600
                        outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            /></div>
        {(categoryFilter !== 'all' || dateFrom || dateTo) && (
            <button
                onClick={() => {
                setCategoryFilter('all');
                setDateFrom('');
                setDateTo('');
                }}
                className="inline h-9 px-2 text-sm rounded-xl border border-slate-200 text-rose-500
                        hover:bg-rose-50 dark:border-slate-700 mr-auto"
            >
                X Clear
            </button>
            )}
      </div>
      <TransactionsTable
        transactions={result}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteTransaction}
      />

      {showModal && (
        <AddTransactionModal
          onClose={handleCloseModal}
          transactionToEdit={editingTransaction}
        />
      )}
    </div>
  );
}
