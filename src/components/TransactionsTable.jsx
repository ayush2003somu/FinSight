import { useContext } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { MCC_MAP } from "../data/mockData";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Credit", value: "income" },
  { label: "Debit", value: "expense" },
];

const iconClassName = "text-slate-400 dark:text-slate-500";

const formatAmount = (transaction) => {
  const sign = transaction.type === "income" ? "+" : "-";
  return `${sign}₹${transaction.amount.toLocaleString()}`;
};

const SortIcon = ({ active, order }) => {
  if (!active) {
    return <ArrowUpDown className={iconClassName} size={20} />;
  }

  return order === "asc" ? (
    <ArrowDown className={iconClassName} size={20} />
  ) : (
    <ArrowUp className={iconClassName} size={20} />
  );
};

const TransactionsTable = ({ transactions }) => {
  const { filter, setFilter, sortBy, setSortBy, order, setOrder,admin } =
    useContext(AppContext);

  const toggleSort = (column) => {
    setSortBy(column);
    setOrder(sortBy === column && order === "asc" ? "desc" : "asc");
  };
    const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.type === filter,
        );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortBy === "date") {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }

    return 0;
  });
  transactions = sortedTransactions;
  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-4 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Activity
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800 mr-auto">
            {FILTER_OPTIONS.map((option) => {
              const isActive = filter === option.value;

             return (
               <button
                  key={option.label}
                 type="button"
                  onClick={() => setFilter(option.value)}
                className={`rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
               <button
                    type="button"
                    onClick={() => toggleSort("date")}
                    className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <span>DATE</span>
                    <SortIcon active={sortBy === "date"} order={order} />
                  </button>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  DESCRIPTION
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  CATEGORY
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={() => toggleSort("amount")}
                    className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <span>AMOUNT</span>
                    <SortIcon active={sortBy === "amount"} order={order} />
                </button>
                </th>
               <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  STATUS
                </th>

                {admin && <th className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  ACTION
                </th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition-all duration-200 ease-in-out hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {transaction.date}
                  </td>
               <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">
                    <div className="font-medium">{MCC_MAP[transaction.mcc]}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      MCC: {transaction.mcc}
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                    transaction.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-100"
                    }`}
                  >
                    {formatAmount(transaction)}
                </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        transaction.type === "income"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                      }`}
                    >
                      {transaction.type}
                    </span>
              </td>
              {admin && (
              <td className="flex p-2 mt-4">
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-slate-200
                                      text-slate-500 hover:bg-slate-50 mr-2">
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: t.id })}
                      className="text-xs px-2.5 py-1 rounded-lg border border-rose-200
                                text-rose-500 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </td>
                )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionsTable;
