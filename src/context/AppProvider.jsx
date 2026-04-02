import { useState,useEffect } from "react";
import { AppContext } from "./appContext";
import { RECENT_TRANSACTIONS } from "../data/mockData";

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("date"); 
  const [order, setOrder] = useState("desc"); // asc | desc

  // this is done so that browser remember's the user preference(dark or light);
  const [isDark,setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  //  whenever isDark(Boolean) changes, useEffect runs and theme get updated in local Storage 
useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  const toggleDark = () => setIsDark(prev => !prev);
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
        toggleDark
      }}
    >
      {children}
    </AppContext.Provider>
  );
};