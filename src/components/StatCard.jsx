const StatCard = ({ title, value, type, saving}) => (
  <div className={`p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md ${

    type === 'score'? (saving>60 ? 'bg-green-100 border-emerald-600':'bg-rose-200 border-rose-600'):'bg-white'
  }`}>
    <p className="text-sm font-large text-gray-500 uppercase tracking-wider">{title}</p>
    <p className={`text-3xl font-bold mt-2 ${
      type === 'income' ? 'text-emerald-600' : 
      type === 'expense' ? 'text-rose-600' : 
      type === 'score' && saving>60 ? 'text-emerald-600' :'text-rose-600'

    }`}>
      {type != 'score'? `₹${value.toLocaleString()}` : ``}
      {type === 'score' ? `${value.toLocaleString()}` : ``}

    </p>
    {/* <p className={`text-sm font-small ${}`}></p> */}{// here we will write percentage change in the income and expense;
    }
  </div>
);
export default StatCard;