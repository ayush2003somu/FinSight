import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { ArrowUp } from 'lucide-react';
const TransactionsTable = ({transactions})=>{   
const {filter, setFilter, sortBy, setSortBy, order, setOrder} = useContext(AppContext);
    return(
      // Table Top Bar
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">Recent Activity</h2>
              {/* Filter Buttons */}
              <div className="flex-1 "></div>
             <div className="flex gap-3 justify-between mr-10 ">
                {[{"label":"All","value":"all"}, 
                {"label":"Credit","value":"income"}, 
                {"label":"Debit","value":"expense"}].map((type) => (
            <button
                key={type.label}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === type.value? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
         >{type.label}</button>
            ))}
        </div>    
        <div>
        </div>
              <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <th
                  className="px-6 py-4 text-s font-bold text-slate-400 flex gap-2"
                  >                   
                    <span className="cursor-pointer" onClick={() => {
                    setSortBy("date");
                    setOrder(order === "asc" ? "desc" : "asc");
                  }}>DATE {sortBy === "date" && (order === "asc" ? "⬆️" : "⬇️")}</span><ArrowUp size={"1.25rem"}/>
                  </th>
                  <th className="px-6 py-4 text-s font-bold text-slate-400 ">
                    CATEGORY
                  </th>
                  <th
                      className="px-6 py-4 text-s font-bold text-slate-400 cursor-pointer"
                      onClick={() => {
                      setSortBy("amount");
                      setOrder(order === "asc" ? "desc" : "asc");
                      }}>
                      AMOUNT {sortBy === "amount" && (order === "asc" ? "⬆️" : "⬇️")}
                  </th>
                  <th className="px-6 py-4 text-s font-bold text-slate-400 uppercase">
                      Status
                  </th>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{tx.category}</td>
                      <td className={`px-6 py-4 font-mono font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900'}`}>
                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tighter ${
                          tx.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          )}

  

export default TransactionsTable;