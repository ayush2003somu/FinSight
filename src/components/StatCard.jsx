import { useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { SquareArrowUpRight , SquareArrowDownLeft , HandCoins } from "lucide-react";
const formatCurrency = (value) => `₹${value.toLocaleString()}`;

const StatCard = ({ title, value, type, saving, delta, deltaLabel }) => {
  const { balance, showBalance } = useContext(AppContext);

  const cardStyles =
    type === "score"
      ? saving > 60
        ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-400": 
        "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/20 dark:border-rose-700 dark:text-rose-400"
      : "bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-700";

  const valueStyles =
    type === "income"
      ? "text-emerald-600 dark:text-emerald-400"
      : type === "expense"
        ? "text-rose-600 dark:text-rose-400"
      : type === "score"
        ? ""
      : "text-slate-900 dark:text-slate-100";

  const displayedValue =
    type === "score"
      ? value
      : type === "balance" && !balance
        ? "₹••••••"
        : formatCurrency(value);

  return (
    <div
      className={`h-36 rounded-2xl border p-6 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md ${cardStyles}`}
    >
      <div className="flex h-full flex-col justify-start gap-4">
        <div className="flex items-center justify-start gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {title}
          </p>

          {type === "balance" && (
            <button
              type="button"
              aria-label={balance ? "Hide balance" : "Show balance"}
              onClick={() => showBalance(!balance)}
              className="rounded-lg text-slate-400 transition-all duration-200 ease-in-out hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              {balance ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            
          )}
          {type!="balance" &&(
            type==="income"?<SquareArrowDownLeft className="text-emerald-600 dark:text-emerald-400" size={20}/>:
            type==="expense"?<SquareArrowUpRight className="text-rose-600 dark:text-rose-400" size={20}/>:<HandCoins className="text-yellow-600" size={20}/> 
          )}
        </div>

        <div className="space-y-1">
          <p className={`text-2xl font-bold ${valueStyles}`}>{displayedValue}</p>

          {delta !== undefined && (
            <p
              className={`text-sm font-medium ${
                delta >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {balance
                ? `${delta >= 0 ? "↑" : "↓"} ${formatCurrency(Math.abs(delta))} ${deltaLabel}`
                : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
