import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { MCC_MAP } from "../data/mockData";
const TransactionsTable = ({transactions})=>{   
const {filter, setFilter, sortBy, setSortBy, order, setOrder} = useContext(AppContext);
    return(
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-h-96">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-lg">Recent Activity</h2>
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
        {/* Set a max height and make the table body scrollable */}
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-scroll" >
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th
                    className="px-6 py-4 text-s font-bold text-slate-400"
                  >                   
                    <span className="cursor-pointer flex gap-2 items-center" onClick={() => {
                      setSortBy("date");
                      setOrder(order === "asc" ? "desc" : "asc");
                    }}>DATE {sortBy==="date"?(order === "asc" ? <ArrowDown size={"1.25rem"}/> : <ArrowUp size={"1.25rem"}/>):<ArrowUpDown size={"1.25rem"}/>}
                    </span>
                  </th>
                  <th className="px-6 py-4 text-s font-bold text-slate-400 ">
                    DESCRIPTION
                  </th>
                  <th className="px-6 py-4 text-s font-bold text-slate-400 ">
                    CATEGORY
                  </th>
                  <th
                    className="px-6 py-4 text-s font-bold text-slate-400">
                    <span className="cursor-pointer flex gap-2 items-center"
                      onClick={() => {
                        setSortBy("amount");
                        setOrder(order === "asc" ? "desc" : "asc");
                      }}>
                      AMOUNT {sortBy==="amount"?(order === "asc" ?<ArrowDown size={"1.25rem"}/>: <ArrowUp size={"1.25rem"}/> ):<ArrowUpDown size={"1.25rem"}/>}
                    </span>
                  </th>
                  <th className="px-6 py-4 text-s font-bold text-slate-400">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{tx.description}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 ">
                      {MCC_MAP[tx.mcc]}
                      <div className="text-slate-400 text-xs">MCC:{tx.mcc}</div>
                    </td>
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
        </div>
      </section>
    )}

  

export default TransactionsTable;