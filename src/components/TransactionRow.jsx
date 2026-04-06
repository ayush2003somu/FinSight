import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MCC_MAP } from '../data/mockData';

export function TransactionRow({ transaction: t, role, formatDate }) {
  const { dispatch } = useContext(AppContext);

  const category = MCC_MAP[t.mcc] || 'Other';

  return (
    <tr className="border-b border-slate-100 dark:border-slate-700
                   hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">

      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
        {formatDate(t.date)}
      </td>

      <td className="px-4 py-3">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{t.description}</p>
        <p className="text-xs text-slate-400">MCC: {t.mcc}</p>
      </td>

      <td className="px-4 py-3">
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600
                         dark:bg-slate-700 dark:text-slate-300">
          {category}
        </span>
      </td>

      <td className={`px-4 py-3 text-sm font-semibold
        ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-500'}`}>
        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
      </td>

      <td className="px-4 py-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium
          ${t.type === 'income'
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
            : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
          }`}>
          {t.type}
        </span>
      </td>
      {role === 'admin' && (
        <td className="px-4 py-3">
          <button className="text-xs px-2.5 py-1 rounded-lg border border-slate-200
                             text-slate-500 hover:bg-slate-50 mr-2 dark:border-slate-700">
            Edit
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: t.id })}
            className="text-xs px-2.5 py-1 rounded-lg border border-rose-200
                       text-rose-500 hover:bg-rose-50 dark:border-rose-900"
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
