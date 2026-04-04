import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

export default function BarCharts({data}){
    const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
          {payload.map((entry) => (
            <p key={entry.name}
               className={entry.name === 'income' ? 'text-emerald-600' : 'text-rose-500'}>
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  if (data.length === 0) {
  return (
    <div className="flex items-center justify-center h-full text-sm text-slate-400">
      No data for this period
    </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barGap={4} barCategoryGap="30%">
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip/>} cursor={{ fill: '#f1f5f9' }} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
        />
        <Bar dataKey="income" name="income" fill="#059669" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

}