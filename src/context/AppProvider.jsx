import { useState } from "react";
import { AppContext } from "./appContext";
import { RECENT_TRANSACTIONS } from "../data/mockData";

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all"); 
  const [sortBy, setSortBy] = useState("date"); 
  const [order, setOrder] = useState("desc"); // asc | desc

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
        setOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};