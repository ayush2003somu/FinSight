import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

function getTransactionsByDateRange(transactions, selectedPeriod) {
  const now = new Date();
  const cutoff = new Date(now);
  if (selectedPeriod === "1M") {
    cutoff.setMonth(now.getMonth() - 1);
  } else if (selectedPeriod === "3M") {
    cutoff.setMonth(now.getMonth() - 3);
  } else if (selectedPeriod === "6M") {
    cutoff.setMonth(now.getMonth() - 6);
  } else {
    cutoff.setFullYear(now.getFullYear() - 1);
  }

  return transactions.filter((transaction) => new Date(transaction.date) >= cutoff);
}

export default function FinTrackDashboard() {
  const { transactions, filter, sortBy, order, selectedPeriod } =
    useContext(AppContext);

  const filteredTransactionsByDateRange = getTransactionsByDateRange(
    transactions,
    selectedPeriod,
  );

  const totalBalance = transactions.reduce((sum, transaction) => {
    return transaction.type === "income"
      ? sum + transaction.amount
      : sum - transaction.amount;
  }, 0);

  const income = filteredTransactionsByDateRange
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = filteredTransactionsByDateRange
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const periodNet = income - expenses;
  const savingScore = income === 0 ? 0 : ((income - expenses) / income) * 100;
  const healthScore = Math.min(100, Math.max(0, Math.round(savingScore * 1.5)));

  const filteredTransactions =
    filter === "all"
      ? filteredTransactionsByDateRange
      : filteredTransactionsByDateRange.filter(
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

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <NavBar />
          <div className="mx-auto max-w-7xl p-6 lg:p-8">
            <header className="mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Welcome back! Here is what's happening with your money.
              </p>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* LEFT: 2x2 CARDS */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StatCard
                    title="Total Balance"
                    value={totalBalance}
                    type="balance"
                    delta={periodNet}
                    deltaLabel={`this ${selectedPeriod}`}
                  />

                    <StatCard title="Income" value={income} type="income" />

                    <StatCard title="Expenses" value={expenses} type="expense" />

                    <StatCard
                      title="Saving Score"
                      value={`${healthScore}/100`}
                      type="score"
                      saving={savingScore}
                    />
                  </div>

                  {/* RIGHT: GRAPH */}
                  <div className="min-h-[312px] rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/60">
                    <div className="flex h-full items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                      Graph and pie chart area
                    </div>
                  </div>
           </section>
            <TransactionsTable transactions={sortedTransactions} />
          </div>
        </main>
      </div>
    </div>
  );
}
