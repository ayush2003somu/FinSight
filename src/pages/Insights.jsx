import { useContext } from "react";
import {ArrowDownRight,ArrowUpRight,Lightbulb, ReceiptIndianRupee, TrendingUp,
Wallet,} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { MCC_MAP } from "../data/mockData";
import BarCharts from "../components/BarCharts";
import SpendingDonut from "../components/PieChart";
import {  buildMonthlyData,formatCurrency, getTransactionsByDateRange,} from "../utils/transactionInsights";

export default function Insights() {
  const { transactions, selectedPeriod } = useContext(AppContext);

  const filteredTransactions = getTransactionsByDateRange(transactions,selectedPeriod);

  const incomeTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "income",
  );
  const expenseTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );
  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );
  const netCashFlow = totalIncome - totalExpenses;

  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
  const category = MCC_MAP[transaction.mcc] || "Other";
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const topCategory = topCategories[0];

  const sourceTotals = incomeTransactions.reduce((acc, transaction) => {
    acc[transaction.description] = (acc[transaction.description] || 0) + transaction.amount;
    return acc;
  }, {});

  const topSource = Object.entries(sourceTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)[0];

  const monthlyData = buildMonthlyData(filteredTransactions);
  const recentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  let monthlySignal = "Not enough monthly history yet";
  if (recentMonth && previousMonth) {
    const diff =
      recentMonth.expenses + recentMonth.income - (previousMonth.expenses + previousMonth.income);
    monthlySignal =
      diff >= 0
        ? `Activity is up by ${formatCurrency(diff)} compared with last month`
        : `Activity is down by ${formatCurrency(Math.abs(diff))} compared with last month`;
  }

  const averageExpense =
    expenseTransactions.length > 0
      ? Math.round(totalExpenses / expenseTransactions.length)
      : 0;

  const insightCards = [
    {
      title: "Net Cash Flow",
      value: formatCurrency(netCashFlow),
      note:
        netCashFlow >= 0
          ? "Income is higher than expenses"
          : "Expenses are higher than income",
      icon: netCashFlow >= 0 ? ArrowUpRight : ArrowDownRight,
      tone:
        netCashFlow >= 0
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Top Spend Category",
      value: topCategory ? topCategory.name : "No expense data",
      note: topCategory ? formatCurrency(topCategory.value) : "Nothing recorded yet",
      icon: ReceiptIndianRupee,
      tone: "text-slate-700 dark:text-slate-200",
    },
    {
      title: "Main Income Source",
      value: topSource ? topSource.name : "No income data",
      note: topSource ? formatCurrency(topSource.value) : "Nothing recorded yet",
      icon: Wallet,
      tone: "text-slate-700 dark:text-slate-200",
    },
    {
      title: "Average Expense",
      value: formatCurrency(averageExpense),
      note: `${expenseTransactions.length} outgoing transactions in this ${selectedPeriod}`,
      icon: TrendingUp,
      tone: "text-slate-700 dark:text-slate-200",
    },
  ];

  const pieChartData = topCategories.slice(0, 6);

  return (
    <div className="p-6 lg:p-8">
      <header className="mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Here are some useful insights for the selected {selectedPeriod}.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <Icon className={card.tone} size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {card.note}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Income vs Expenses Trend
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Monthly view of income and expenses
              </p>
            </div>
          </div>
          <BarCharts data={monthlyData} />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {monthlySignal}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
              <Lightbulb size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Expense Breakdown
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Category-wise expense split
              </p>
            </div>
          </div>
          <SpendingDonut data={pieChartData} />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Top Spending Categories
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Based on total spending in this period
          </p>

          <div className="mt-5 space-y-4">
            {topCategories.slice(0, 5).map((category, index) => {
              const share = totalExpenses
                ? Math.round((category.value / totalExpenses) * 100)
                : 0;

              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {index + 1}. {category.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {share}% of total expenses
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {formatCurrency(category.value)}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-slate-700 dark:bg-slate-300"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Summary
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A quick summary of the current period
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Spending hotspot
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {topCategory
                  ? `${topCategory.name} is the highest spending category at ${formatCurrency(
                      topCategory.value,
                    )}.`
                  : "No expense data available for this period."}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Earnings anchor
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {topSource
                  ? `${topSource.name} contributed the highest income at ${formatCurrency(
                      topSource.value,
                    )}.`
                  : "No income data available for this period."}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Balance check
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {netCashFlow >= 0
                  ? `Net cash flow is positive by ${formatCurrency(netCashFlow)} in this ${selectedPeriod}.`
                  : `Net cash flow is negative by ${formatCurrency(Math.abs(netCashFlow))} in this ${selectedPeriod}.`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
