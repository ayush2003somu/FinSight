import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";
import BarCharts from '../components/BarCharts';
import SpendingDonut from "../components/PieChart";
import { PieChart,ChevronsUpDown, ChartColumnBig } from "lucide-react";
import {buildCategoryData, buildMonthlyData, getTransactionsByDateRange,} from "../utils/transactionInsights";

export default function FinTrackDashboard() {
  const { transactions, selectedPeriod, SelectedBar,setBar,} =
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

  const barChartData = buildMonthlyData(filteredTransactionsByDateRange);
  const categoryData = buildCategoryData(filteredTransactionsByDateRange);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 sm: mx-auto flex w-full max-w-[1400px]  border border-slate-200 bg-gray-100 shadow-sm dark:border-slate-800 dark:bg-slate-900 ">
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-8">
            <header className="mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Welcome back! Here is what's happening with your money.
              </p>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StatCard
                    title="Total Balance"
                    value={totalBalance}
                    type="balance"
                    delta={periodNet}
                    deltaLabel={`(${selectedPeriod})`}
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
                  <div className="min-h-[312px] rounded-2xl border border border-slate-300 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">  
                     <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4 flex justify-between items-center">
                    {SelectedBar?`Cash Flow Momentum`:`Expense Mix`}
                    <button onClick={()=>{
                      setBar(!SelectedBar)
                    }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition-all duration-200 ease-in-out hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                    <span className="flex items-center gap-2">  {SelectedBar?<PieChart/>:<ChartColumnBig  />}<ChevronsUpDown size={20} /></span>
                    </button>
                    </p>
                  {SelectedBar?<div className="bg-white border border-slate-200 rounded-2xl p-5
                  dark:bg-slate-800 dark:border-slate-700">
                    <BarCharts data={barChartData} />
                    </div>:
                    <div className="bg-white border border-slate-200 rounded-2xl p-5
                  dark:bg-slate-800 dark:border-slate-700">
                    <SpendingDonut data={categoryData} />
                    </div>
                    }
                  </div>
        </section>
            <TransactionsTable transactions={filteredTransactionsByDateRange} showViewAll={true} />
          </div>
        </main>
      </div>
  );
}
