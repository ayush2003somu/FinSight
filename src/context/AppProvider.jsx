import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { RECENT_TRANSACTIONS } from "../data/mockData";

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("date"); 
  const [order, setOrder] = useState("desc"); // asc or desc
  const [balance,showBalance] = useState(false);
  const [selectedPeriod,setPeriod] = useState('1M');
  const [SelectedBar,setBar] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isOpen,setIsOpen] = useState(true);

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
        role,
        setRole,
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
