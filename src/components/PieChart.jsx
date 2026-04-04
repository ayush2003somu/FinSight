import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = [
    '#f43f5e', 
    '#3b82f6', 
    '#f59e0b', 
    '#8b5cf6', 
    '#06b6d4', 
    '#10b981', 
    '#6366f1', 
    '#eab308', 
    '#14b8a6', 
    '#ef4444', 
    '#22d3ee', 
    '#84cc16', 
];

export default function SpendingDonut({ data }) {

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-slate-400">
        No expense data for this period
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percent = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm dark:bg-slate-800 dark:border-slate-700">
          <p className="font-semibold text-slate-700 dark:text-slate-200">{payload[0].name}</p>
          <p className="text-slate-500">₹{payload[0].value.toLocaleString()}</p>
          <p className="text-slate-400">{percent}% of expenses</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={175}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          paddingAngle={3}
          dataKey="value"
          activeShape={{ outerRadius: 65 }} 
        >
          {data.map((entry, index) => (
            <Cell
             key={entry.name} 
            fill={COLORS[index % COLORS.length]}
            className="cursor-pointer"
             />
          ))}
        </Pie>
        <Tooltip content={({ active, payload }) => <CustomTooltip active={active} payload={payload} total={total} />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}