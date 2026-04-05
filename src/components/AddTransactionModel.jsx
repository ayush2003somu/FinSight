import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function AddTransactionModal({ onClose }) {
  const { dispatch } = useContext(AppContext);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0], // today's date
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    // basic validation
    if (!form.description || !form.amount || !form.date) return;

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...form,
        amount: Number(form.amount), // convert string to number
        mcc: '9999',                 // default mcc for manually added
        id: Date.now(),
      }
    });

    onClose();
  }

  return (
    // dark overlay behind modal
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose} // clicking outside closes it
    >
      {/* modal box — stop click from bubbling to overlay */}
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200
                   dark:border-slate-700 p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">
            Add Transaction
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none"
          >✕</button>
        </div>

        <div className="flex flex-col gap-3">

          <div>
            <label className="text-xs text-slate-500 mb-1 block">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Swiggy, Salary"
              className="w-full h-9 px-3 text-sm rounded-xl border border-slate-200
                         bg-white outline-none focus:border-blue-300 text-slate-700
                         dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Amount (₹)</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full h-9 px-3 text-sm rounded-xl border border-slate-200
                           bg-white outline-none focus:border-blue-300 text-slate-700
                           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full h-9 px-3 text-sm rounded-xl border border-slate-200
                           bg-white outline-none text-slate-700 cursor-pointer
                           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Food, Rent"
                className="w-full h-9 px-3 text-sm rounded-xl border border-slate-200
                           bg-white outline-none focus:border-blue-300 text-slate-700
                           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full h-9 px-3 text-sm rounded-xl border border-slate-200
                           bg-white outline-none text-slate-700 cursor-pointer
                           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm rounded-xl border border-slate-200
                       text-slate-500 hover:bg-slate-50 dark:border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 text-sm rounded-xl bg-blue-600 text-white
                       hover:bg-blue-700 font-medium transition-colors"
          >
            Add Transaction
          </button>
        </div>

      </div>
    </div>
  );
}