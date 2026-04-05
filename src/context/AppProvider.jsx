import { useState, useEffect,useReducer} from "react";
import { AppContext } from "./AppContext";
import { RECENT_TRANSACTIONS } from "../data/mockData";

function transactionReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.payload];

    case 'DELETE_TRANSACTION':
      return state.filter(t => t.id !== action.payload);

    case 'EDIT_TRANSACTION':
      return state.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction
      );

    default:
      return state;
  }
}
export const AppProvider = ({ children }) => {
  const [transactions,setTransactions] = useReducer(transactionReducer, RECENT_TRANSACTIONS);
  const [admin, setAdminRole] = useState(false);
  const [filter, setFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("date"); 
  const [order, setOrder] = useState("desc"); // asc or desc
  const [balance,showBalance] = useState(false);
  const [selectedPeriod,setPeriod] = useState('1M');
  const [SelectedBar,setBar] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isOpen,setIsOpen] = useState("true");

  // this is done so that browser remember's the user preference(dark or light);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  const toggleDark = () => {
  setIsDark((prev) => {
      const nextTheme = !prev;
      document.documentElement.classList.toggle("dark", nextTheme);
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };
  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        dispatch: setTransactions,
        admin,
        setAdminRole,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        order,
        setOrder,
        isDark,
        toggleDark,
        balance,
        showBalance,
        selectedPeriod,
        setPeriod,
        SelectedBar,
        setBar,
        currentPage,
        setCurrentPage,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
